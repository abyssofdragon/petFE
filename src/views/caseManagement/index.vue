<template>
  <div style="margin: 20px">
    <div class="title">
      病例管理
    </div>

    <div style="margin: 20px">
      <div>
        <el-button type="success" @click="addDialog = true">增加病例</el-button>
        <span style="float: right">
          <el-input
            v-model="typeSearch"
            class="input"
            placeholder="请输入内容"
            clearable
          />
          <el-button>筛选病种</el-button>
        </span>
        <span style="float: right">
          <el-input
            v-model="caseSearch"
            class="input"
            placeholder="请输入内容"
            clearable
          />
          <el-button>搜索病例</el-button>
        </span>
      </div>
      <el-table
        :data="caseList"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="编号"
          width="180"
        />
        <el-table-column
          prop="type"
          label="病种"
          width="180"
          :filters="typeFilter"
          :filter-method="filterType"
        />
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="接诊状态">
                <span>{{ props.row.state }}</span>
              </el-form-item>
              <el-form-item label="诊疗过程和方法">
                <span>{{ props.row.content }}</span>
              </el-form-item>
              <el-form-item label="诊断结果">
                <span>{{ props.row.result }}</span>
              </el-form-item>
              <el-form-item label="治疗方案">
                <span>{{ props.row.method }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="病例名称"
          width="180"
        />
        <el-table-column
          lable="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="modifyD(scope.$index)" />
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteD(scope.$index)" />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="增加病例"
      :visible.sync="addDialog"
      width="30%"
    >
      <el-form ref="form" :model="mycase" label-width="150px">
        <el-form-item label="病种">
          <el-input v-model="mycase.type" />
        </el-form-item>
        <el-form-item label="病例名称">
          <el-input v-model="mycase.name" />
        </el-form-item>
        <el-form-item label="接诊状态">
          <el-input v-model="mycase.state" />
        </el-form-item>
        <el-form-item label="诊疗过程和方法">
          <el-input v-model="mycase.content" />
        </el-form-item>
        <el-form-item label="诊断结果">
          <el-input v-model="mycase.result" />
        </el-form-item>
        <el-form-item label="治疗方案">
          <el-input v-model="mycase.method" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addCase">立即增加</el-button>
          <el-button @click="addDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="修改病例"
      :visible.sync="modifyDialog"
      width="60%"
    >
      <el-form ref="form" :model="mycase" label-width="120px">
        <el-form-item label="病种">
          <el-input v-model="mycase.type" />
        </el-form-item>
        <el-form-item label="病例名称">
          <el-input v-model="mycase.name" />
        </el-form-item>
        <el-form-item label="接诊状态">
          <el-input v-model="mycase.state" type="textarea" autosize></el-input>
        </el-form-item>
        <el-form-item label="诊疗过程和方法">
          <el-input v-model="mycase.content" type="textarea" autosize></el-input>
        </el-form-item>
        <el-form-item label="诊断结果">
          <el-input v-model="mycase.result" type="textarea" autosize></el-input>
        </el-form-item>
        <el-form-item label="治疗方案">
          <el-input v-model="mycase.method" type="textarea" autosize></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="modifyCase">立即修改</el-button>
          <el-button @click="modifyDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="警告"
      :visible.sync="caseDialog"
      width="30%"
    >
      <span>是否确认删除病例?</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="caseDialog = false">取 消</el-button>
        <el-button type="danger" @click="deleteCase">确 认</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

export default {
  data() {
    return {
      caseList: [{ id: 0, type: '口炎', name: '这是第一个病例', state: '接诊状态a', content: '诊疗过程和方法a', result: '诊断结果a', method: '治疗方案a' },
        { id: 1, type: '肠炎', name: '这是第二个病例', state: '接诊状态b', content: '诊疗过程和方法b', result: '诊断结果b', method: '治疗方案b' }],
      typeFilter: [{ text: '口炎', value: '口炎' }, { text: '肠炎', value: '肠炎' }],
      caseDialog: false,
      addDialog: false,
      modifyDialog: false,
      mycase: { id: 0, type: '', name: '', state: '', content: '', result: '', method: '' },
      typeSearch: '',
      caseSearch: '',
      index: 0
    }
  },
  methods: {
    deleteD(index) {
      this.index = index
      this.caseDialog = true
    },
    modifyD(index) {
      this.index = index
      this.mycase = this.caseList[index]
      this.modifyDialog = true
    },
    deleteCase() {
      this.caseList.splice(this.index, 1)
      this.caseDialog = false
    },
    modifyCase() {
      this.caseList[this.index] = this.mycase
      this.mycase = { id: 0, type: '', name: '', state: '', content: '', result: '', method: '' }
      this.modifyDialog = false
    },
    addCase() {
      this.mycase.id = this.caseList[this.caseList.length - 1].id + 1
      this.caseList.push(this.mycase)
      this.mycase = { id: 0, type: '', name: '', state: '', content: '', result: '', method: '' }
      this.addDialog = false
    },
    filterType(value, row) {
      return row.type === value
    }
  }
}
</script>

<style>
.title{
  text-align: center;
  font-size: x-large;
}

.input{
  width: 200px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  color: #99a9bf;
  width: 150px;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  display: block;
}
</style>
