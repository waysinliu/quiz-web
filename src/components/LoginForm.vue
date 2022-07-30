<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { login, signup } from "../api/user";

const user = reactive({
  email: "waysin.liu@gmail.com",
  password: "123456"
});

const isLogin = ref(true);
const checkEmail = () => {
  const label = document.getElementsByClassName("tips")[0];
  if (user.email === "") {
    label.innerText = "邮箱不能为空.";
    return false;
  }
  const regex = /^(\w|\.|\-)+@(\w|\-)+(\.(\w|\-)+)+$/;
  if (user.email.search(regex) < 0) {
    label.innerText = "邮箱格式错误.";
    return false;
  }
  label.innerText = "";
  return true;
};

const checkPassword = () => {
  const label = document.getElementsByClassName("tips")[1];
  if (user.password === "") {
    label.innerText = "密码不能为空.";
    return false;
  }
  if (!isLogin) {
    const regex = /^(\w|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\=|\+|\[|\{|\]|\}|\;|\:|\'|\"|\,|\<|\.|\>|\/|\?|\`|\~)+$/;
    if (user.password.search(regex) < 0) {
      label.innerText = "密码只支持英文数字与常见符号.";
      return false;
    }
  }
  label.innerText = "";
  return true;
};

const router = useRouter();
const isLoading = ref(false);
const loginHandler = async () => {
  if (!checkEmail()) return;
  if (!checkPassword()) return;
  isLoading.value = true;
  await login({
    email: user.email,
    password: user.password
  })
    .then((res) => {
      if (res && res.data.state) {
        localStorage.setItem("token", res.data.data);
        router.push("/");
      } else {
        document.getElementsByClassName("tips")[0].innerText = res ? res.data.msg : "连接失败.";
        isLoading.value = false;
      }
    })
    .catch((res) => {
      document.getElementsByClassName("tips")[0].innerText = "连接失败.";
      isLoading.value = false;
    });
};
const signupHandler = async () => {
  if (!checkEmail()) return;
  if (!checkPassword()) return;
  isLoading.value = true;
  await signup({
    email: user.email,
    password: user.password
  })
    .then((res) => {
      if (res && res.data.state) {
        localStorage.setItem("token", res.data.data);
        router.push("/");
      } else {
        document.getElementsByClassName("tips")[0].innerText = res ? res.data.msg : "连接失败.";
        isLoading.value = false;
      }
    })
    .catch((res) => {
      document.getElementsByClassName("tips")[0].innerText = "连接失败.";
      isLoading.value = false;
    });
};
</script>

<template>
  <div class="login-form">
    <label for="email">邮箱:<span class="tips"></span></label>
    <input
      type="email"
      id="email"
      class="input"
      maxlength="64"
      v-model.trim="user.email"
      :disabled="isLoading"
      @change="checkEmail"
    />
    <label for="password">密码:<span class="tips"></span></label>
    <input
      type="password"
      id="password"
      class="input"
      maxlength="32"
      v-model.trim="user.password"
      :disabled="isLoading"
      @change="checkPassword"
    />
    <button
      class="submit"
      :disabled="isLoading"
      @click="
        () => {
          isLogin ? loginHandler() : signupHandler();
        }
      "
    >
      <span v-if="!isLoading">{{ isLogin ? "登录" : "注册" }}</span>
      <span v-else>{{ isLogin ? "登录中..." : "注册中..." }}</span>
    </button>
    <button
      class="shift"
      :disabled="isLoading"
      @click="
        () => {
          isLogin = !isLogin;
        }
      "
    >
      {{ isLogin ? "注册" : "返回登录" }}
    </button>
  </div>
</template>

<style scoped>
.login-form {
  flex-grow: 0;
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
}

label {
  position: relative;
}

.tips {
  position: absolute;
  right: 0;
  color: var(--error-color);
}

input {
  width: 100%;
  height: 32px;
  margin-bottom: 30px;
}

button {
  width: 100%;
  height: 45px;
  border-radius: 45px;
  color: var(--font-color);
}

.submit {
  margin-bottom: 15px;
  background-color: var(--primary-color);
}

.submit:active {
  filter: brightness(90%);
}

.shift {
  margin-bottom: 60px;
  background-color: transparent;
}

:disabled {
  color: var(--font-dim-color);
}

.submit,
.submit:disabled {
  color: var(--font-dark-color);
}
</style>
