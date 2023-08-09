# Changelog

### [3.2.1](https://github.com/icelam/html-inline-script-webpack-plugin/compare/v3.2.0...v3.2.1) (2023-08-09)


### Bug Fixes

* resolve public path base on html-webpack-plugin and webpack config ([c333304](https://github.com/icelam/html-inline-script-webpack-plugin/commit/c333304722aa8a9f594bbcc7d48944b7720ec499))

## [3.2.0](https://github.com/icelam/html-inline-script-webpack-plugin/compare/v3.1.0...v3.2.0) (2023-06-02)


### Features

* support preserving inlined assets by regex ([#434](https://github.com/icelam/html-inline-script-webpack-plugin/issues/434)) ([239e7b9](https://github.com/icelam/html-inline-script-webpack-plugin/commit/239e7b9e31dabf6699089357af214951c6209918))

## [3.1.0](https://github.com/icelam/html-inline-script-webpack-plugin/compare/v3.0.1...v3.1.0) (2022-08-05)


### Features

* escape all </script> that appears inside source ([cdf4b31](https://github.com/icelam/html-inline-script-webpack-plugin/commit/cdf4b3198f4ff927fe03a25b6f35eacff6080ff2))

### [3.0.1](https://github.com/icelam/html-inline-script-webpack-plugin/compare/v3.0.0...v3.0.1) (2022-07-24)


### Bug Fixes

* unable to match assets when filename contains special characters ([ce6be9c](https://github.com/icelam/html-inline-script-webpack-plugin/commit/ce6be9cc09c40cfd85377a62b119bacdf590c67b))

## [3.0.0](https://github.com/icelam/html-inline-script-webpack-plugin/compare/v2.0.3...v3.0.0) (2022-02-27)


### Features

* new option for defining HTML templates the plugin should process ([1ffe025](https://github.com/icelam/html-inline-script-webpack-plugin/commit/1ffe025618685b99a1c37ef6d925b422ae5918c7))

### [2.0.3](https://github.com/icelam/html-inline-script-webpack-plugin/compare/v2.0.2...v2.0.3) (2021-10-30)


### Bug Fixes

* delete only script files which has been processed by plugin ([4e40c19](https://github.com/icelam/html-inline-script-webpack-plugin/commit/4e40c19ee11688f9ee9bbb25196cc30a0f7372ce))

### [2.0.2](https://github.com/icelam/html-inline-script-webpack-plugin/compare/v2.0.1...v2.0.2) (2021-07-04)


### Bug Fixes

* invalid logic on missing script check ([#198](https://github.com/icelam/html-inline-script-webpack-plugin/issues/198)) ([e9f9f26](https://github.com/icelam/html-inline-script-webpack-plugin/commit/e9f9f26a247df31a0f1b4849410a775b477cca76))

### [2.0.1](https://github.com/icelam/html-inline-script-webpack-plugin/compare/v2.0.0...v2.0.1) (2021-05-05)


### Bug Fixes

* chage the default test scope to avoid targeting map files or gzip files ([7539425](https://github.com/icelam/html-inline-script-webpack-plugin/commit/75394251d96d94dbb35ae9b353b9ca6f24c6cec8))

## [2.0.0](https://github.com/icelam/html-inline-script-webpack-plugin/compare/v1.1.2...v2.0.0) (2021-03-21)


### Features

* support for webpack 5 ([a015679](https://github.com/icelam/html-inline-script-webpack-plugin/commit/a0156798e6a80d58d4db52d0fb614bc673cac9f3))

### [1.1.2](https://github.com/icelam/html-inline-script-webpack-plugin/compare/v1.1.1...v1.1.2) (2021-03-06)


### Bug Fixes

* fix no construct signatures error throw by typescript ([d00e1a7](https://github.com/icelam/html-inline-script-webpack-plugin/commit/d00e1a7eb79bb81642246ac81d68807b72bcb06e))

### [1.1.1](https://github.com/icelam/html-inline-script-webpack-plugin/compare/v1.1.0...v1.1.1) (2021-03-01)


### Bug Fixes

* ignore .husky and scripts folder when publishing package ([f056fa2](https://github.com/icelam/html-inline-script-webpack-plugin/commit/f056fa26f242cdca73254f5a0a260a98c4e477d7))

## [1.1.0](https://github.com/icelam/html-inline-script-webpack-plugin/compare/v1.0.1...v1.1.0) (2021-03-01)


### Features

* enhance typings ([9da9cec](https://github.com/icelam/html-inline-script-webpack-plugin/commit/9da9ceca3477a5f82b416a69704b9c790212a738))

### [1.0.1](https://github.com/icelam/html-inline-script-webpack-plugin/compare/v1.0.0...v1.0.1) (2021-01-22)


### Bug Fixes

* assets source become undefined in some scenario ([d60c640](https://github.com/icelam/html-inline-script-webpack-plugin/commit/d60c640eb7eaf0673a4930fc9cf7777b89a2c0ab)), closes [#1](https://github.com/icelam/html-inline-script-webpack-plugin/issues/1)

## 1.0.0 (2020-07-09)


### Features

* html inline script webpack plugin ([979d3c8](https://github.com/icelam/html-inline-script-webpack-plugin/commit/979d3c8bf9699235209f3852c2600756b9a8281c))
