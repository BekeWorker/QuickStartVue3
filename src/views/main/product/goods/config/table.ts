import { ref } from 'vue'
const useTableOptions = (params: any) => {
  const { initData } = params
  const handleSizeChange = (val: number) => {
    tableOptions.value.pageNum = 1
    tableOptions.value.pageSize = val
    initData()
  }
  const handleCurrentChange = (val: number) => {
    tableOptions.value.pageNum = val
    initData()
  }
  const tableOptions = ref<any>(null)
  tableOptions.value = {
    tableData: [
      {
        id: 1,
        brand: 'APPLE',
        country: 0,
        desc: '苹果公司（Apple Inc. ）是美国高科技公司。2021财年苹果营收达到3658亿美元，由史蒂夫·乔布斯、斯蒂夫·盖瑞·沃兹尼亚克和罗纳德·杰拉尔德·韦恩（Ron Wayne）等人于1976年4月1日创立，并命名为美国苹果电脑公司（Apple Computer Inc.），2007年1月9日更名为苹果公司，总部位于加利福尼亚州的库比蒂诺。'
      },
      {
        id: 2,
        brand: 'XIAOMI',
        country: 1,
        desc: '小米科技有限责任公司成立于2010年3月3日，是专注于智能硬件、电子产品、芯片研发 [635] 、智能手机、智能电动汽车 [332] 、通信 [628] 、金融 [630] 、互联网电视及智能家居生态链建设的全球化移动互联网企业、创新型科技企业。 [2-3]小米公司创造了用互联网模式开发手机操作系统、发烧友参与开发改进的模式。'
      },
      {
        id: 3,
        brand: 'HUAWEI',
        country: 1,
        desc: '华为技术有限公司，成立于1987年，总部位于广东省深圳市龙岗区。 [1]2021年，华为公司的总收入为6368亿元，净利润达到1137亿元。 [232]华为是全球领先的信息与通信技术（ICT）解决方案供应商，专注于ICT领域，坚持稳健经营、持续创新、开放合作，在电信运营商、企业、终端和云计算等领域构筑了端到端的解决方案优势，为运营商客户、企业客户和消费者提供有竞争力的ICT解决方案、产品和服务，并致力于实现未来信息社会、构建更美好的全联接世界。'
      }
    ],
    tableColumn: [
      {
        type: 'index',
        label: '序号',
        width: '100'
      },
      {
        prop: 'id',
        label: 'ID',
        minWidth: '50'
      },
      {
        prop: 'brand',
        label: '品牌',
        minWidth: '200'
      },
      {
        prop: 'country',
        label: '国家',
        minWidth: '200'
      },
      {
        prop: 'operation',
        label: '操作',
        width: '140',
        fixed: 'right',
        slotName: 'operation'
      }
    ],
    showIndex: true,
    showPagination: true,
    pageNum: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30],
    handleSizeChange,
    handleCurrentChange,
    total: 100
  }
  return tableOptions
}

export default useTableOptions
