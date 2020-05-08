// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:0,
    tabs:[{
      id:0,
      value:"综合",
      isActive:true
    },
    {
      id:1,
      value:"销量",
      isActive:false
    },
    {
      id:2,
      value:"价格",
      isActive:false
    },],
    secondPageIndex:1,
    thirdPageIndex:1,
    firstArray:[],
    secondArray:[],
    thirdArray:[]
  },
  parmas:{
    cid:0,
    firstPageIndex:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.parmas.cid = options.cid;
    console.log(this.parmas.cid);
    this.setData({
      cid:options.cid
    })
    wx.startPullDownRefresh({
      complete: (res) => {
        this.parmas.firstPageIndex=1;
        this.getFirstData();
      },
    })
  },

  tabsSelectAction:function(e){
    console.log(e.detail.index);
    const {index} = e.detail;
    let tabs = this.data.tabs;
    tabs.forEach((v,i) => i==index?v.isActive=true:v.isActive=false);
    console.log(tabs);
    this.setData({
      tabs
    })
  },

  getFirstData:function(){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
      data:{'cid':this.parmas.cid,"pagenum":this.parmas.firstPageIndex,"pagesize":"20"},
      success:(res)=>{
        var listArray = [];
        if (res.data.message.pagenum > 1) {
          listArray = this.firstArray;
        }
        if (res.data.message.pagenum*20<res.data.message.total) {
          this.parmas.firstPageIndex+=1;
        }
        this.setData({
          firstArray:[...this.data.firstArray,...res.data.message.goods]
        })
      },
      fail:(error)=>{

      }
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
    this.getFirstData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})