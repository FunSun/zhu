# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.12.0]
### Added
- preview显示标签, 点击标签会在query中添加对应的内容
### Fixed
- 修复了不使用body scroll之后， scrollToBottom无法触发的情况

## [1.11.0] - 2018-10-17
### Added
- 使用了自己写的pagex parser
- pagex增加了对数学公式的支持
- pagex增加了对图标的支持
- pagex增加了对绘图的支持
### Changed
- 更改Preview的接口
### Fixed
- 能够选择文本
- 增大编辑区域
- 修复了modal中滚动条到头会触发body滚动的问题
- 修复了重构bindings之后, mobx数据改动不触发view更新的情况
- 使mobx devtools能够显示flow名称(给flow传递一个有名字的generator)

## [1.10.0] - 2018-10-12
### Added
- 编辑页面增加了预览tab
- 增加了自动补全
### Changed
- 重构了部分组件, 将依赖mobx的代码全部放到bindings.tsx下面了

## [1.9.0] - 2018-10-10
### Added
- comment增加了时间显示
- 可以编辑文章
- 采用ace使得编辑打到可用状态
- 采用github flavour markdown的css样式渲染article页面

## [1.8.0] - 2018-10-09
### Added
- 使用material design

## [1.7.0] - 2018-10-08
### Added
- 增加了测试
- 增加了ArticlePreview ArticleView等
- 增加了对pagex的支持

## [1.6.0] - 2018-10-06
### Added
- 增加了comment类型
- 增了添加comment的面板

## [1.5.0] - 2018-10-05
### Added
- 增加了scroll到底部自动加载的功能
### Fixed
- 修复了scroll的时候背景着色异常的情况

## [1.4.0] - 2018-10-04
### Added
- 增加了Button和Modal通用组件
- 增加了Previews下的多个状态无关
- 增加了编辑标签的功能
### Changed
- 对一系列组件做了重构


## [1.3.0] - 2018-10-02
### Added
- 增加了LinkPreview

## [1.2.0] - 2018-10-01
### Added
- 添加了LICENSE
### Changed
- 搜索结果的关键词显示为黄色背景的正常字体

## [1.1.0] - 2018-09-25
### Added
- 增加了便利的Input组件
- 增加了UIStore, 来保存跨组件状态
- 增加了添加通用blog的UI
- ResourceStore增加了添加blog的action
### Changed
- App组件默认充满屏幕

## [1.0.0] - 2018-09-23
### Added
- 添加了版本管理和changelog
- 添加了基本的业务逻辑