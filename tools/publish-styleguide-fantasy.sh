#!/usr/bin/env sh

echo "Publishing fantasy styleguide..."

STYLEGUIDE_NAME="styleguide-fantasy"

ROOT="$(dirname $(dirname $0))"
SOURCE_SHOWCASE_DIR="$ROOT/arui-demo/$STYLEGUIDE_NAME"
PUBLISH_SHOWCASE_DIR="$ROOT/$STYLEGUIDE_NAME"

git config user.name "Travis CI"
git config user.email "travis@travis-ci.org"

git remote add upstream "https://$GH_TOKEN@github.com/alfa-laboratory/arui-feather.git"
git fetch -q upstream && git reset -q upstream/gh-pages

npm run styleguide-build-fantasy
mkdir -p $PUBLISH_SHOWCASE_DIR
cp -r $SOURCE_SHOWCASE_DIR/* $PUBLISH_SHOWCASE_DIR

git add -A -f "$PUBLISH_SHOWCASE_DIR"
git commit -q -m "chore(*): update fantasy styleguide by travis build $TRAVIS_BUILD_NUMBER"
git push -q upstream HEAD:gh-pages
