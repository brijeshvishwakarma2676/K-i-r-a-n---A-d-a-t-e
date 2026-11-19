#!/bin/sh
# Makes an AVIF copy (about half the size) next to every WebP photograph in public/img that does
# not have one yet. Browsers that read AVIF get it; the others keep the WebP (see ArtImage.jsx).
# Images with transparency (the cut-out portrait) keep it: the alpha goes in a second AV1 stream.
# The build stops if any WebP lacks its AVIF, so run this after adding or re-importing photos:
#
#   sh scripts/make-avif.sh
#
# Needs ffmpeg (with ffprobe) and the libaom-av1 encoder.
cd "$(dirname "$0")/.." || exit 1
find public/img -name '*.webp' | while read -r f; do
  [ -f "${f%.webp}.avif" ] || printf '%s\n' "$f"
done | xargs -r -P 8 -I{} sh -c '
  f="{}"; out="${f%.webp}.avif"
  enc="-c:v libaom-av1 -still-picture 1 -crf 32 -cpu-used 6"
  case "$(ffprobe -v error -select_streams v:0 -show_entries stream=pix_fmt -of csv=p=0 "$f")" in
    yuva*|argb|rgba|bgra|abgr)
      ffmpeg -hide_banner -loglevel error -y -i "$f" -filter_complex "[0:v]format=yuva420p,split[c][a];[a]alphaextract[al]" -map "[c]" -map "[al]" $enc "$out" ;;
    *)
      ffmpeg -hide_banner -loglevel error -y -i "$f" $enc "$out" ;;
  esac && printf .'
echo
echo "AVIF: $(find public/img -name '*.avif' | wc -l) files, WebP: $(find public/img -name '*.webp' | wc -l) files"
