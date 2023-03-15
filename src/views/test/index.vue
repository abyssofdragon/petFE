<template>
  <div style="margin-left: 20px">
    <div class="title">
      测试
    </div>
    <div>
      <el-card class="box-card" v-if="showCard">
        <div slot="header" class="clearfix">
          <span style="font-size: larger">考试列表</span>
          <el-input
            class="input"
            placeholder="请输入内容"
            v-model="input"
            clearable>
          </el-input>
        </div>
        <el-table :data="examList" ref="table" @row-click="enterExam">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="考试名称"
            width="180"
          />
          <el-table-column
            prop="time"
            label="考试时间"
            width="180"
          />
          <el-table-column
            prop="description"
            label="考试描述"
            width="180"
          />
        </el-table>
      </el-card>
    </div>
    <div v-if="showExam">
      <p>第一个考试</p>
      <el-form ref="form" :model="form" label-width="80px" style="border: solid black; width: 70%">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      examList: [{ index: 1, name: '第一个考试', time: '考试时间', description: '这是第一个考试的描述' },
        { index: 2, name: '第二个考试', time: '考试时间', description: '这是第二个考试的描述' }],
      input: '',
      showCard: true,
      showExam: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    enterExam(e) {
      console.log(e.index)
      this.showCard = false
      this.showExam = true
    }
  }
}
</script>

<style>
.title{
  text-align: center;
  font-size: x-large;
}

.box-card{
  width: 70%;
  margin-left: 50px;
}

.input{
  width: 200px;
  float: right;
}
</style>
