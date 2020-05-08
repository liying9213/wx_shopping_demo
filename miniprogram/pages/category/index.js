// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList:[],
    selectIndex:0,
    contentList:{}
  },

   getCategoryData:function(){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
      success:(res)=>{
        console.log(res);
        if (res.data.meta.status == 200) {
          wx.setStorageSync('category', {"time":Date.now(),"data":res.data.message});
          this.setData({
            categoryList:res.data.message,
            selectIndex:0,
            contentList:res.data.message[0]
          });
        }
      },
      fail:(error)=>{
      }
    })
  },

  leftSelectAction:function(e){
    const index = e.currentTarget.dataset.selectindex;
    const content = this.data.categoryList[index];
    this.setData({
      selectIndex:index,
      contentList:content
    })
  },

  rightSelectAction:function(e){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cache = wx.getStorageSync('category');
    console.log(cache,cache.data);
    console.log(Date.now() - cache.time);
    if (!cache || Date.now() - cache.time > 1000*10) {
      wx.startPullDownRefresh({
        complete: (res) => {
          this.getCategoryData();
        },
      })
    }
    else{
      this.setData({
        categoryList:cache.data,     
        selectIndex:0,
        contentList:cache.data[0]
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})