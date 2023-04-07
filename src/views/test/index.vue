<template>
  <div style="margin-left: 20px">
    <div class="title">
      测试
    </div>

    <el-card v-if="showCard" class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: larger">病种列表</span>
        <span style="float: right">
          <span style="color: #99a9bf">
            请选择病种，系统将根据选择自动生成试卷
          </span>
          <el-button type="primary" @click="enterExam">
            生成试卷
          </el-button>
        </span>
      </div>

      <el-checkbox-group
        v-model="checkedTypes"
        :min="1"
        :max="5">
        <el-checkbox style="width: 200px" v-for="o in type" :label="o" :key="o">
          <el-tag>{{ o }}</el-tag>
        </el-checkbox>
      </el-checkbox-group>

    </el-card>

    <el-card v-if="showExam" class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: larger">{{ paperName }}</span>
        <el-button
          type="primary"
          style="float: right"
          @click="select"
        >返回</el-button>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <div v-for="o in 5" :key="o" style="margin: 50px">
          <div>
            <span>
              {{ o + '. ' + form.problem[o] }}
            </span>
            <span style="float: right">
              {{ '(' + form.resource[o].charAt(0) + ')' }}
            </span>
          </div>
          <br/>
          <el-radio-group v-model="form.resource[o]">
            <div>
              <el-radio :label="form.options[0]" />
            </div>
            <div>
              <el-radio :label="form.options[1]" />
            </div>
            <div>
              <el-radio :label="form.options[2]" />
            </div>
            <div>
              <el-radio :label="form.options[3]" />
            </div>
          </el-radio-group>
        </div>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即交卷</el-button>
          <el-button type="primary" @click="select">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card v-if="showResult" class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: larger">考试结果</span>
        <div class="score">{{ '考试成绩: ' + score }}</div>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <div v-for="o in 5" :key="o" style="margin: 50px">
          <div>
            <i v-if="form.marking[o]" class="el-icon-error" style="color: red"></i>
            <i v-if="form.remarking[o]" class="el-icon-success" style="color: blue"></i>
            <span>
              {{ o + '. ' + form.problem[o] }}
            </span>
            <span style="float: right">
              {{ '(' + form.resource[o].charAt(0) + ')' }}
            </span>
          </div>
          <br/>
          <el-radio-group disabled v-model="form.resource[o]">
            <div>
              <el-radio :label="form.options[0]" />
            </div>
            <div>
              <el-radio :label="form.options[1]" />
            </div>
            <div>
              <el-radio :label="form.options[2]" />
            </div>
            <div>
              <el-radio :label="form.options[3]" />
            </div>
          </el-radio-group>
        </div>
        <el-form-item>
          <el-button type="primary" @click="select">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      showCard: true,
      showExam: false,
      showResult: false,
      score: '99',
      type: ['犬瘟热', '犬细小病毒', '犬传染性肝炎', '犬冠状病毒', '猫泛白细胞减少症', '猫病毒性病气管炎', '皮肤真菌感染'],
      checkedTypes: [],
      paperName: '',
      form: {
        options: ['A.选项a', 'B.选项b', 'C.选项c', 'D.选项d'],
        problem: ['', '第一题', '甲', '乙', '丙', '丁'],
        resource: ['', 'B.选项b', 'A.选项a', 'D.选项d', '', ''],
        marking: [0, 0, 1, 0, 0, 1],
        remarking: [0, 1, 0, 1, 1, 0]
      }
    }
  },
  methods: {
    enterExam() {
      this.paperName = '根据'
      for (let i = 0; i < this.checkedTypes.length; i++) {
        this.paperName = this.paperName + this.checkedTypes[i]
        if (i !== this.checkedTypes.length - 1) {
          this.paperName = this.paperName + ', '
        }
      }
      this.paperName = this.paperName + '生成的试卷'
      this.showCard = false
      this.showResult = false
      this.showExam = true
    },
    select() {
      this.showResult = false
      this.showCard = true
      this.showExam = false
    },
    onSubmit() {
      this.showCard = false
      this.showExam = false
      this.showResult = true
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
}

.score{
  float: right;
  font-size: large;
  color: red;
}
</style>
