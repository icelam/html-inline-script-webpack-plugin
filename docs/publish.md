# Publish procedure

## Version 1
For publishing v1 of the plugin which supports webpack 4, checkout `v1` branch, and run the following commands:
```bash
# checkout branch
git checkout v1

# pull the latest code
git pull

# make sure dependencies are in correct version
yarn

# bump package version
yarn release

# create build
yarn build

# publish to npm (OTP needed)
npm publish

# push code and trigger github release creation
git push --follow-tags
```

## Version 2
For publishing v2 of the plugin which supports webpack 5, checkout `develop` branch, and run the following commands:
```bash
# checkout branch
git checkout develop

# pull the latest code
git pull

# switch to master branch
git checkout master

# pull the latest code from master
git pull

# merge code from develop branch
git merge --no-ff develop

# make sure dependencies are in correct version
yarn

# bump package version
yarn release

# create build
yarn build

# publish to npm (OTP needed)
npm publish

# push code and trigger github release creation
git push --follow-tags

# merge change logs back to develop
git checkout develop
git merge --no-ff master
git push
```

## Pointing distribution tags `latest` to a specific version
Since npm automatically tag newest published version with distribution tags `latest`, it might be end up in some scenerio where a smaller semver is being taged as `latest`. To point a specific version of package back to `latest`, run the command: 

```bash
# Point the distribution tags `latest` to a specific version (OTP needed)
npm dist-tag add html-inline-script-webpack-plugin@<version> latest
```
