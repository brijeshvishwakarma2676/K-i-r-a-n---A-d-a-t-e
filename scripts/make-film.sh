#!/bin/sh
# Prepares a film of a work for the site: H.264 MP4, at most 1080p, sized for the web and set to
# start playing before it has fully downloaded. The original footage is not changed.
#
#   sh scripts/make-film.sh ~/Downloads/hawker-making.mov hawker
#
# writes public/film/hawker.mp4. Then add to the work in src/data/projects.js:
#
#   film: { src: '/film/hawker.mp4', caption: 'The making of the Hawker', date: '2026-12-01', length: '2:40' },
#
# The script prints the length to use. Needs ffmpeg.
set -e
[ $# -eq 2 ] || { echo "usage: sh scripts/make-film.sh <footage> <name>"; exit 1; }
cd "$(dirname "$0")/.."
mkdir -p public/film
out="public/film/$2.mp4"
ffmpeg -hide_banner -loglevel error -y -i "$1" \
  -vf "scale='min(1920,iw)':-2" -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p \
  -c:a aac -b:a 128k -ac 2 -movflags +faststart "$out"
secs=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$out" | cut -d. -f1)
printf 'Wrote %s (%s). length: %d:%02d\n' "$out" "$(du -h "$out" | cut -f1)" $((secs / 60)) $((secs % 60))
