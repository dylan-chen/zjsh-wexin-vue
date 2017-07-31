import Vue from 'vue';
import Vuex from 'vuex';
import Common from '../config/Common';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    zjsh_version: '3.5.0',

    // 这个字符串中的路由的name不会被拦截器拦截
    interceptorsExceptList: 'user',

    Token: '',
    UserId: '',
    OpenId: '',// 微信用户标识
    PhoneNumber: '',
    DefaultAddressId: '',
    ThreeServiceId: '12', // 详情页跳转下单页对应服务三级id
    ThreeServiceName: '油烟机清洗', // 详情页跳转下单页对应服务三级name
    OrderIdForPay: '', // 支付页面的订单id
    OrderInfo: { // 下单页提交订单信息
      FourServiceId: '', // 四级服务id
      Amount: '', // 服务数量
      Price: '', // 服务单价
      SellType: '', // 1:定价类型 2:面议类型
      SpecialType: '0',
      OrderFrom: '210', // 订单来源 0:android 1:ios 210:微信
      ServiceContent: '', // 备注
      DateTime: '', // 订单预约时间
      IsClaims: '1', // 是否使用1元保险
      Address: {
        Id: '', // 服务地址id
      },
      // 被选中的红包信息
      CouponSelected: {
        NoUse: '1',
      },
    },

    // 地址增加&修改时的地址信息
    AddressAddedInfo: {
      Id: '',
      Contact: '',
      Gender: '',
      PhoneNumber: '',
      Address1: '',
      Address1Lng: '',
      Address1Lat: '',
      Address2: '',
      Tag: ''
    },

    // 错误&提示信息
    ALERT_MSG: {
      NET_ERROR: '网络连接异常，请检查您的网络',
      SEND_CAPTCHA: '验证码发送成功，请注意查收',
      PAY_SUCESS: '支付成功',
      PAY_ERROR: '支付失败',
    },

    // 如何使用下面的两个过滤列表：ThreeServiceIdFilterList.includes(' ' + id + ' ')【或者判断indexOf是否大于-1】
    // 注意：必须加上id前后的空格才能保证正确判断
    ThreeServiceIdFilterList: ' 2 3 4 12 13 15 ', // 首页对应的三级服务id
    FourServiceIdFilterList: ' 5 733 734 735 316 317 297 298 299 300 301 302 307 308 ', // 首页对应的四级服务id

    // 全局弹框配置
    AlertMsg: '', // 弹出信息
    AlertTimeout: '1000', // 弹框持续时间
    AlertStatus: '0', // 弹框状态：0:隐藏，1:显示
  },
  mutations: {
    SetToken(state, data = '') {
      Common.setCookie('ZJSH_WX_Token', data, 30, '/');
      return state.Token = data;
    },
    SetUserId(state, data = '') {
      Common.setCookie('ZJSH_WX_UserId', data, 30, '/');
      return state.UserId = data;
    },
    SetOpenId(state, data = '') {
      return state.OpenId = data;
    },
    SetDefaultAddressId(state, data = '') {
      Common.setCookie('ZJSH_WX_DefaultAddressId', data, 30, '/');
      return state.DefaultAddressId = data;
    },
    SetPhoneNumber(state, data = '') {
      return state.PhoneNumber = data;
    },
    SetThreeServiceId(state, data = '') {
      return state.ThreeServiceId = data;
    },
    SetThreeServiceName(state, data = '') {
      return state.ThreeServiceName = data;
    },
    SetOrderIdForPay(state, data = '') {
      Common.setCookie('ZJSH_WX_OrderIdForPay', data, 30, '/');
      return state.OrderIdForPay = data;
    },
    SetOrderInfo(state, data) {
      Common.setCookie('ZJSH_WX_OrderInfo', JSON.stringify(data), 30, '/');
      return state.OrderInfo = data;
    },
    SetAddressAddedInfo(state, data) {
      return state.AddressAddedInfo = data;
    },
    SetCouponList(state, data) {
      return state.CouponList = data;
    },
  },
  actions: {
    SetAlert(context, data) {
      context.state.AlertMsg = data.alertMsg;
      context.state.AlertTimeout = Number(data.alertTimeout);
      context.state.AlertStatus = '1';
      setTimeout(() => {
        context.state.AlertStatus = '0';
      }, context.state.AlertTimeout);
    }
  }
});