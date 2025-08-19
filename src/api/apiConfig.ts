import axios from "axios";
import type { ApiConfigInstance } from "./types";

const apiConfig: ApiConfigInstance = {
  baseURL: "",
  timeout: 1000 * 60 * 5,
  debug: false,
  testUrl: "http://10.10.22.31:4001",
  componentUrl: "/onLineComponents", // https://mg.micro.xczxszzw.com/onLineComponents
  defaultErrorMsg: "服务器错误，请联系管理员",
  project: {
    projectId: 0,
    projectCode: "",
    projectName: "",
  },
  dictUrl: "/api/dict/dictItem/getDictItemByCode",
  dictArrUrl: "/api/dict/dictItem/getDictItemTree",
  customError: false,
  microLoginPaddingTime: 1000,
  fileTypes: {
    pdf: "application/pdf",
  },
  loginOutMessage: "用户登录已失效，请重新登录！",
  tokenName: "token",
  safeOrigin: "",
  responseCodeRange: {
    min: 10000,
    max: 11000,
    arr: [],
  },
  requestHeader: {},
  signal: null,
};

export const onLineComponents: string[] = [];

// const panelUrl = "/api/panel";
const panelUrl = "/api/work-panel";
const userUrl = "/api/user";
const dictUrl = "/api/dict";
const noticeUrl = "/api/rcnotice";
const flyerUrl = "/api/flyer";

const universalApiConfig = {
  progressL2: panelUrl + "/processStandardNode/L2/progressBar",
};

const configNode = {
  page: panelUrl + "/processStandardNode/page", // 列表
  add: panelUrl + "/processStandardNode/add", // 新增
  del: panelUrl + "/processStandardNode/delete", // 删除
  edit: panelUrl + "/processStandardNode/update", // 修改
  init: panelUrl + "/processStandardNode/detail", // 编辑初始化
  userTree: userUrl + "/depart/getByAreaCode",
  userTree2: userUrl + "/depart/getByAreaCode2",
  cityCode: dictUrl + "/dictArea/getListByParentId",
  hbTabList: panelUrl + "/hbTab/list", // 功能按钮

  start: panelUrl + "/hbTab/start", // 启动
  funList: panelUrl + "/hbTab/funsList", // 功能按钮列表
  taskList: panelUrl + "/hbTab/taskList", // 加载功能按钮
  stop: panelUrl + "/hbTab/stop", // 完成
  busList: panelUrl + "/hbTab/busListByUser", // 业务线
  eventList: panelUrl + "/engine-rest/process-definition", // 事件列表
  functionList: panelUrl + "/engine-rest/userTasks", // 功能列表
  busAddFuns: panelUrl + "/engine-rest/processDefinitionAndUserTasks", // 业务+功能

  homeEeventList: panelUrl + "/processStandardNode/eventsListByUser", // 首页事件
  newHomeEeventList: panelUrl + "/processStandardNode/getWaitDones", // 首页事件-新
  homeBusType: panelUrl + "/processStandardNode/L1/business", // 首页补贴分类
  homeBus: panelUrl + "/processStandardNode/L2/functions", // 首页补贴
  homeBusFuns: panelUrl + "/processStandardNode/L3/functions", // 首页待办任务
  homeFunsList: panelUrl + "/processStandardNode/funsListByUser", // 首页功能
  fetchUser: panelUrl + "/engine-rest/claim", // 指定用户

  nodeTree: panelUrl + "/nodeBus/getList", // 节点配置管理树
  nodeTreeNew: panelUrl + "/nodeBus/selectList", // 业务树
  nodeList: panelUrl + "/nodeBus/page", // 节点配置管理树
  nodeCopy: panelUrl + "/nodeBus/copy", // 节点复制

  releaseSuspension: panelUrl + "/operationFlow/releaseSuspension",
  releaseEnd: panelUrl + "/operationFlow/releaseEnd",

  addSample: panelUrl + "/nodeBusExample/add",
};

const apiNotice = {
  add: noticeUrl + "/cmsMessage/add", // 通知公告新增（发布）
  update: noticeUrl + "/cmsMessage/update", // 通知公告修改
  delete: noticeUrl + "/cmsMessage/delete", // 通知删除
  detail: noticeUrl + "/cmsMessage/detail", // 通知详情
  page: noticeUrl + "/cmsMessage/page", // 通知列表
  totalCms: noticeUrl + "/cmsMessage/totalCms", // 通知统计\
  toRead: noticeUrl + "/cmsMessage/toRead", //已读

  selectTasksByType: flyerUrl + "/flyerTaskBaseInfo/selectTasksByType",
  selectTasksByTypePage: flyerUrl + "/flyerTaskBaseInfo/selectTasksByTypePage",
  taskDetail: flyerUrl + "/flyerTaskBaseInfo/taskDetail",
};

const pending = new Map();

export { apiConfig, pending, universalApiConfig, configNode, apiNotice };

export const getOnLineComponents = async () => {
  const res = await axios.get(apiConfig.componentUrl + "/config.json");
  sessionStorage.setItem("components", JSON.stringify(res.data));
  return res.data.list;
};
