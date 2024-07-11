# github搭建图床

tip：下载Watt Toolkit加速

参考资料：[如何搭建自己的图床(GitHub版)-CSDN博客](https://blog.csdn.net/qq_44231797/article/details/131658184)

**1 创建github仓库**

**2 生成token令牌**

​	点击个人头像 -> Settings -> Developer settings -> 选择Tokens(classic) -> 设置Note 和Expiration -> 全选repo -> Generate token -> 复制生成的token

**3 在自己的github仓库创建分支用于存储图片**

**4 下载picgo**

在github中搜索picgo -> 下载对应的picgo安装包（Molunerfinn/PicGo）-> 点击仓库里的Releases,找到适合的安装版本

**5 在picgo配置参数**

图床设置 -> Github -> Github设置按照给的格式

**6 最后将需要上传的图片拖入picgo即可**



## **tip：如何在github上创建一个与master无关联的分支用于存放图片？**

1 打开存放图片或md文件资源的文件夹

2 `git init`初始化本地仓库

3 `git add .`

4 `git commit -m '(提交简述)'`

5 `git remote add origin 'https:xxx.git'`

6 `git push -u origin '(新的远程仓库分支名)'`