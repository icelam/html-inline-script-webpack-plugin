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
git push
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
git push
```
