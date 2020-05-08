Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    menuList:[],
    contentList:[]

  },
/**
   * 获取轮播图数据
   */
  getSwiperListData:function(){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      data:{},
      method:'GET',
      success:(res)=>{
        if (res.data.meta.status == 200) {
          this.setData({
            swiperList:res.data.message
          });
        }
      },
      fail:(error)=>{
      }
    })
  },

/**
   * 获取导航菜单数据
   */
  getmenuListData:function(){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
      success:(res)=>{
        if (res.data.meta.status == 200) {
          this.setData({
            menuList:res.data.message
          }) 
        }    
      },
      fail:(error)=>{

      },
    })
  },

  getListData:function(){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
      success:(res)=>{
        if (res.data.meta.status == 200) {
          this.setData({
            contentList:res.data.message
          }) 
        }   
        wx.stopPullDownRefresh()
      }
    })
  },


  swiperSelectAction(e){
    console.log(e);
    wx.navigateTo({
      url: '../goods_detail/index',
      success:function(res){
        res.eventChannel.emit('goodsid',{goodsid:"qwwwww"})
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.startPullDownRefresh({
      complete: (res) => {
        this.getSwiperListData(); 
        this.getmenuListData();
        this.getListData();
      },
    })
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