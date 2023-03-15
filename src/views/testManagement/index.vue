<template>
  <div style="margin-left: 20px">
    <div class="title">
      测试管理
    </div>
    <el-row>
      <el-col :span="8"><el-button type="primary" v-on:click="manageProblem">考题管理</el-button></el-col>
      <el-col :span="8"><el-button type="primary" v-on:click="managePaper">试卷管理</el-button></el-col>
      <el-col :span="8"><el-button type="primary" v-on:click="manageExam">考试管理</el-button></el-col>
    </el-row>

    <div style="margin: 20px" v-if="problemManagement">
      <el-table
        :data="problemList"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="topic"
          label="题目"
          width="180">
        </el-table-column>
        <el-table-column
          prop="answer"
          label="答案"
          width="180">
        </el-table-column>
        <el-table-column
          prop="score"
          label="分值"
          width="180">
        </el-table-column>
        <el-table-column
          width="180">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </el-table-column>
      </el-table>
      <el-button type="success">增加试题</el-button>
    </div>

    <div style="margin: 20px" v-if="paperManagement">
      <el-table
        :data="paperList"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="试卷名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="score"
          label="考试分数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="duration"
          label="考试时长"
          width="180">
        </el-table-column>
        <el-table-column
          prop="description"
          label="试卷描述"
          width="180">
        </el-table-column>
        <el-table-column
          width="180">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </el-table-column>
      </el-table>
      <el-button type="success">增加试卷</el-button>
    </div>

    <div style="margin: 20px" v-if="examManagement">
      <el-table
        :data="examList"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="考试名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="time"
          label="考试时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="time"
          label="考试时长"
          width="180">
        </el-table-column>
        <el-table-column
          prop="examineeList"
          label="考生"
          width="180">
        </el-table-column>
        <el-table-column
          prop="description"
          label="考试描述"
          width="180">
        </el-table-column>
        <el-table-column
          width="180">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </el-table-column>
      </el-table>
      <el-button type="success">增加考试</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      problemManagement: false,
      paperManagement: false,
      examManagement: false,
      problemList: [{ id: 0, topic: '这是第一个题目', answer: 'A', score: 2 }, { id: 1, topic: '这是第二个题目', answer: 'B', score: 4 }],
      paperList: [{ id: 0, title: '这是第一份试卷', score: 100, duration: '120分钟', description: '这是第一份试卷的描述' }, { id: 1, title: '这是第二份试卷', score: 120, duration: '150分钟', description: '这是第二份试卷的描述' }],
      examList: [{ id: 0, title: '这是第一个考试', time: '这是第一个考试的时间', examineeList: '张三、李四', description: '这是第一个考试的描述' },
        { id: 1, title: '这是第二个考试', time: '这是第二个考试的时间', examineeList: '张三、李四', description: '这是第二个考试的描述' }]
    }
  },
  methods: {
    manageProblem() {
      this.problemManagement = true
      this.paperManagement = false
      this.examManagement = false
    },
    managePaper() {
      this.problemManagement = false
      this.paperManagement = true
      this.examManagement = false
    },
    manageExam() {
      this.problemManagement = false
      this.paperManagement = false
      this.examManagement = true
    }
  }
}
</script>

<style>
.title{
  text-align: center;
  font-size: x-large;
}
</style>
