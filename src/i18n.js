import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    home: 'Home',
    soccer: 'Soccer',
    basketball: 'Basketball',
    chinese: '中文',
    english: 'English',
    AllEvents: 'All',
    SoccerEvents: 'Soccer',
    BasketballEvents: 'Basketball',
    TimeSorting: 'Time sorting',
    Live: 'Live',
    Finished: 'Finished',
    Schedule: 'Schedule',
    Popular: 'Popular events',
    National: 'National competition',
    Completed: 'Completed schedule',
    Next: 'Next schedule',
    win: 'win',
    handicap: 'handicap',
    total: 'total',
    halftime: 'halftime',
    first_half: 'first half',
    midfield: 'midfield',
    second_half: 'second half',
    overtime: 'overtime',
    penalty_kick: 'Penalty kick',
    cancel: 'Cancel',
    tbd: 'TBD',
    cut_in_half: 'cut in half',
    discontinue: 'discontinue',
    postpone: 'postpone',
    select_language: 'select_language',
    select:'select',
    EPL:'EPL',
    La_liga:'La Liga',
    Bundesliga:'Bundesliga',
    MLS:'MLS',
    no_data:'No data yet',
    analysis:'Analysis',
    line:'line up',
    text_live:'Text live broadcast',
    possession:'possession rate',
    shoot:'shoot',
    miss_shot:'Missed the shot',
    shot_on:'Shot on target',
    corner_kick:'corner kick',
    half_corner_kick:'half corner kick',
    yellow_card:'yellow card',
    attack:'attack',
    dangerous_attack:'Dangerous attack',
    shot_blocked:'Shot blocked',
    free_kick:'free kick',
    pass_the_ball:'Pass the ball',
    pass_success_rate:'Pass success rate',
    foul:'foul',
    offside:'Offside',
    save:'save',
    tackle:'Tackle',
    extraordinary:'Extraordinary',
    throw_in:'throw-in',
    center_column:'center column',
    successful_steal:'successful steal',
    intercept:'intercept',
    long_pass:'long pass',
    overview:'Overview',
    chat:'Chat',
  },
  zh_hk: {
    home: '首頁',
    soccer: '足球',
    basketball: '籃球',
    chinese: '中文',
    english: 'English',
    AllEvents: '全部',
    SoccerEvents: '足球',
    BasketballEvents: '籃球',
    TimeSorting: '時間排序',
    Live: '進行中',
    Finished: '已結束',
    Schedule: '未開始',
    Popular: '熱門賽事',
    National: '國家賽事',
    Completed: '完場賽程',
    Next: '下周賽程',
    win: '獲勝',
    handicap: '讓分',
    total: '總分',
    halftime: '半場結束',
    first_half: '上半場',
    midfield: '中場',
    second_half: '下半場',
    overtime: '加時',
    penalty_kick: '點球',
    cancel: '取消',
    tbd: '待定',
    cut_in_half: '腰斬',
    discontinue: '中斷',
    postpone: '推遲',
    select_language: '語言選擇',
    select:'搜尋',
    EPL:'英超',
    La_liga:'西甲',
    Bundesliga:'德甲',
    MLS:'美足聯',
    no_data:'暫無數據',
    analysis:'數據分析',
    line:'陣容',
    text_live:'文字直播',
    possession:'控球率',
    shoot:'射門',
    miss_shot:'射門不中',
    shot_on:'射正',
    corner_kick:'角球',
    half_corner_kick:'半場角球',
    yellow_card:'黃牌',
    attack:'進攻',
    dangerous_attack:'危險進攻',
    shot_blocked:'射門被擋',
    free_kick:'任意球',
    pass_the_ball:'傳球',
    pass_success_rate:'傳球成功率',
    foul:'犯規',
    offside:'越位',
    save:'救球',
    tackle:'鏟球',
    extraordinary:'過人',
    throw_in:'界外球',
    center_column:'中柱',
    successful_steal:'成功搶斷',
    intercept:'阻截',
    long_pass:'長傳',
    overview:'概覽',
    chat:'聊天',
  },
  zh_cn: {
    home: '首页',
    soccer: '足球',
    basketball: '篮球',
    chinese: '中文',
    english: 'English',
    AllEvents: '全部',
    SoccerEvents: '足球',
    BasketballEvents: '篮球',
    TimeSorting: '时间排序',
    Live: '进行中',
    Finished: '已结束',
    Schedule: '未开始',
    Popular: '热门赛事',
    National: '国家赛事',
    Completed: '完场赛程',
    Next: '下周赛程',
    win: '获胜',
    handicap: '让分',
    total: '總分',
    halftime: '半场结束',
    first_half: '上半场',
    midfield: '中场',
    second_half: '下半场',
    overtime: '加时',
    penalty_kick: '点球',
    cancel: '取消',
    tbd: '待定',
    cut_in_half: '腰斩',
    discontinue: '中断',
    postpone: '推迟',
    select_language: '语言选择',
    select:'搜索',
    EPL:'英超联赛',
    La_liga:'西甲联赛',
    Bundesliga:'德甲联赛',
    MLS:'美職足球',
    no_data:'暂无数据',
    analysis:'数据分析',
    line:'阵容',
    text_live:'文字直播',
    possession:'控球率',
    shoot:'射门',
    miss_shot:'射门不中',
    shot_on:'射正',
    corner_kick:'角球',
    half_corner_kick:'半场角球',
    yellow_card:'黄牌',
    attack:'进攻',
    dangerous_attack:'危险进攻',
    shot_blocked:'射门被挡',
    free_kick:'任意球',
    pass_the_ball:'传球',
    pass_success_rate:'传球成功率',
    foul:'犯规',
    offside:'越位',
    save:'救球',
    tackle:'铲球',
    extraordinary:'过人',
    throw_in:'界外球',
    center_column:'中柱',
    successful_steal:'成功抢断',
    intercept:'阻截',
    long_pass:'长传',
    overview:'概览',
    chat:'聊天',
  },
  thai: {
    home: 'หน้าแรก',
    soccer: 'ฟุตบอล',
    basketball: 'บาสเกตบอล',
    chinese: '中文',
    english: 'English',
    AllEvents: 'ทุกการแข่งขัน',
    SoccerEvents: 'ฟุตบอล',
    BasketballEvents: 'บาสเกตบอล',
    TimeSorting: 'จัดเรียงตามเวลา',
    Live: 'ถ่ายทอดสด',
    Finished: 'จบการแข่งขัน',
    Schedule: 'ตารางการแข่งขัน',
    Popular: 'ยอดนิยม',
    National: 'การแข่งขันระดับชาติ',
    Completed: 'การแข่งขันที่จบแล้ว',
    Next: 'การแข่งขันถัดไป',
    win: 'ชนะ',
    handicap: 'แฮนดิแคป',
    total: 'รวม',
    halftime: 'ครึ่งแรก',
    first_half: 'ครึ่งแรก',
    midfield: 'กลางสนาม',
    second_half: 'ครึ่งหลัง',
    overtime: 'ครึ่งหลัง',
    penalty_kick: 'จุดโทษ',
    cancel: 'ยกเลิก',
    tbd: 'รอตัดสิน',
    cut_in_half: 'หั่นครึ่ง',
    discontinue: 'หยุดใช้',
    postpone: 'เลื่อนออกไป',
    select_language: 'เลือกภาษา',
    select:'เลือก',
    EPL:'พรีเมียร์ลีก',
    La_liga:'ลาลีกา',
    Bundesliga:'บุนเดสลีกา',
    MLS:'MLS',
    no_data:'ยังไม่มีข้อมูล',
    analysis:'การวิเคราะห์ข้อมูล',
    line:'เข้าแถว',
    text_live:'ส่งข้อความถ่ายทอดสด',
    possession:'อัตราการครอบครอง',
    shoot:'ยิง',
    miss_shot:'ยิงพลาด.',
    shot_on:'ยิงเข้าเป้า',
    corner_kick:'เตะมุม',
    half_corner_kick:'เตะมุมครึ่ง',
    yellow_card:'ใบเหลือง',
    attack:'จู่โจม',
    dangerous_attack:'การโจมตีที่เป็นอันตราย',
    shot_blocked:'Shot blocked',
    free_kick:'ฟรีคิก',
    pass_the_ball:'ส่งบอล',
    pass_success_rate:'อัตราความสำเร็จในการผ่าน',
    foul:'เหม็น',
    offside:'ล้ำหน้า',
    save:'บันทึก',
    tackle:'เข้าสกัด',
    extraordinary:'พิเศษ',
    throw_in:'ทุ่มเข้า',
    center_column:'คอลัมน์กลาง',
    successful_steal:'ขโมยสำเร็จ',
    intercept:'สกัดกั้น',
    long_pass:'ผ่านไปนาน',
    overview:'ภาพรวม',
    chat:'แชท',
  }
}

const i18n = createI18n({
  locale: 'zh_hk', // 设置默认语言
  messages
})

export default i18n