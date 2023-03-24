<template>
  <div style="margin: 20px">
    <div class="title">
      题库管理
    </div>

    <div style="margin: 20px">
      <div>
        <el-button type="success" @click="addDialog = true">增加试题</el-button>
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
            v-model="problemSearch"
            class="input"
            placeholder="请输入内容"
            clearable
          />
          <el-button>搜索题目</el-button>
        </span>
      </div>

      <el-table
        :data="problemList"
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
              <el-form-item label="选项A">
                <span>{{ props.row.optionA }}</span>
              </el-form-item>
              <el-form-item label="选项B">
                <span>{{ props.row.optionB }}</span>
              </el-form-item>
              <el-form-item label="选项C">
                <span>{{ props.row.optionC }}</span>
              </el-form-item>
              <el-form-item label="选项D">
                <span>{{ props.row.optionD }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column
          prop="topic"
          label="题目"
          width="180"
        />
        <el-table-column
          prop="answer"
          label="答案"
          width="180"
        />
        <el-table-column
          prop="score"
          label="分值"
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
      title="修改试题"
      :visible.sync="modifyDialog"
      width="30%"
    >
      <el-form ref="form" :model="problem" label-width="80px">
        <el-form-item label="病种">
          <el-input v-model="problem.type"></el-input>
        </el-form-item>
        <el-form-item label="题目">
          <el-input v-model="problem.topic"></el-input>
        </el-form-item>
        <el-form-item label="选项A">
          <el-input v-model="problem.optionA"></el-input>
        </el-form-item>
        <el-form-item label="选项B">
          <el-input v-model="problem.optionB"></el-input>
        </el-form-item>
        <el-form-item label="选项C">
          <el-input v-model="problem.optionC"></el-input>
        </el-form-item>
        <el-form-item label="选项D">
          <el-input v-model="problem.optionD"></el-input>
        </el-form-item>
        <el-form-item label="答案">
          <el-input v-model="problem.answer"></el-input>
        </el-form-item>
<!--        <el-form-item label="分值">-->
<!--          <el-input v-model="problem.score"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="modifyProblem">立即修改</el-button>
          <el-button @click="modifyDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="增加试题"
      :visible.sync="addDialog"
      width="30%"
    >
      <el-form ref="form" :model="problem" label-width="80px">
        <el-form-item label="病种">
          <el-input v-model="problem.type" />
        </el-form-item>
        <el-form-item label="题目">
          <el-input v-model="problem.topic" />
        </el-form-item>
        <el-form-item label="选项A">
          <el-input v-model="problem.optionA"></el-input>
        </el-form-item>
        <el-form-item label="选项B">
          <el-input v-model="problem.optionB"></el-input>
        </el-form-item>
        <el-form-item label="选项C">
          <el-input v-model="problem.optionC"></el-input>
        </el-form-item>
        <el-form-item label="选项D">
          <el-input v-model="problem.optionD"></el-input>
        </el-form-item>
        <el-form-item label="答案">
          <el-input v-model="problem.answer" />
        </el-form-item>
<!--        <el-form-item label="分值">-->
<!--          <el-input v-model="problem.score"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="addProblem">立即增加</el-button>
          <el-button @click="addDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="警告"
      :visible.sync="deleteDialog"
      width="30%"
    >
      <span>是否确认删除试题?</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteDialog = false">取 消</el-button>
        <el-button type="danger" @click="deleteProblem">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      problemList: [{ id: 0, type: '口炎', topic: '这是第一个题目', optionA: '选项a', optionB: '选项b', optionC: '选项c', optionD: '选项d', answer: 'A', score: 2 }, { id: 1, type: '肠炎', topic: '这是第二个题目', optionA: '选项a', optionB: '选项b', optionC: '选项c', optionD: '选项d', answer: 'B', score: 4 }],
      typeFilter: [{ text: '口炎', value: '口炎' }, { text: '肠炎', value: '肠炎' }],
      deleteDialog: false,
      addDialog: false,
      modifyDialog: false,
      typeSearch: '',
      problemSearch: '',
      problem: { id: 0, type: '', topic: '', optionA: '', optionB: '', optionC: '', optionD: '', answer: '', score: 0 },
      index: 0
    }
  },
  methods: {
    deleteD(index) {
      this.index = index
      this.deleteDialog = true
    },
    modifyD(index) {
      this.index = index
      this.problem = this.problemList[index]
      this.modifyDialog = true
    },
    modifyProblem() {
      this.problemList[this.index] = this.problem
      this.problem = { id: 0, type: '', topic: '', options: '', answer: '', score: 0 }
      this.modifyDialog = false
    },
    deleteProblem() {
      this.problemList.splice(this.index, 1)
      this.deleteDialog = false
    },
    addProblem() {
      this.problem.id = this.problemList[this.problemList.length - 1].id + 1
      this.problemList.push(this.problem)
      this.problem = { id: 0, type: '', topic: '', options: '', answer: '', score: 0 }
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
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  display: block;
}
</style>
