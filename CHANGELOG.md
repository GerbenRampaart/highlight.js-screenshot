# 1.1.1
- Updated examples inamges in README
- Added tests for some more popular programming languages

# 1.1.0
- Minumum nodejs 10 because highlight.js has nodejs 10 as minimum
    - tsconfig outputs es2018 javascript (so node 10)
    - engines in package.json requires node 10
- Nicer image meta header
- Meta header now default false
- This changelog added
- Typos in README
- Added rimraf for resetting the tsc build every time (also added to prebuild)
- Errors are now only thrown when the language could not be determined or theme could not be found
    - Because highlights language detection is so good it's now an error if the language could not be determined
- Renaming some files
