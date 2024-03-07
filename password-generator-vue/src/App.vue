<script setup>
import { onMounted, ref, watch } from 'vue';

const password = ref("");
const passwordLength = ref(12);
const isNumberAllowed = ref(false);
const isSpecialCharAllowed = ref(false);
const passwordRef = ref(null);

const generatePassword = () => {
  let tempPassword = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if (isNumberAllowed.value) str += "0123456789";
  if (isSpecialCharAllowed.value) str += "!@#$%^&*-_=+[]{}~`";

  let counter = passwordLength.value
  for (let i = 1; i <= counter; i++) {
    let char = Math.floor(Math.random() * str.length + 1);
    tempPassword += str.charAt(char);
  }
  password.value = tempPassword;
}

onMounted(() => {
  generatePassword();
})

watch(passwordLength, (oldLength, newLength) => {
  if(newLength !== oldLength) {
    generatePassword();
  }
})
watch(isNumberAllowed, (oldVal, newVal) => {
  if(newVal !== oldVal) {
    generatePassword();
  }
})
watch(isSpecialCharAllowed, (oldVal, newVal) => {
  if(newVal !== oldVal) {
    generatePassword();
  }
})

const copyGeneratedPassword = () => {
  passwordRef.value?.select();
  window.navigator.clipboard.writeText(password.value);
}

</script>

<template>
  <div class='text-center bg-gray-700 w-full max-w-md mx-auto my-10 py-4 rounded-lg'>
    <h1 class='text-white text-2xl text-center mb-3'>Password Generator</h1>
    <div class='text-center'>
      <input type="text" v-model="password" readOnly placeholder='Generated Password'
        class='py-1 px-2 rounded-md rounded-r-none outline-none text-orange-400' ref="passwordRef" />
      <button @click="copyGeneratedPassword"
        class='bg-blue-700 text-white py-1 px-3 rounded-md rounded-l-none cursor-copy'>Copy</button>
    </div>
    <div id='controls' class='my-4 px-6 py-2 flex gap-3'>
      <div class='flex flex-col w-1/3'>
        <input type="range" :min="8" :max="30" class='accent-blue-600 hover:accent-blue-600 cursor-pointer'
          id='password-length' v-model="passwordLength" />
        <label for="password-length" class='text-orange-400'>Length: {{ passwordLength }}</label>
      </div>
      <div class='text-center'>
        <input type="checkbox" id="number-allowed" v-model="isNumberAllowed"
          class="w-4 h-4 accent-blue-700 outline-none mr-2" />
        <label for="number-allowed" class='text-orange-400'>Numbers</label>
      </div>
      <div>
        <input type="checkbox" id="char-allowed" v-model="isSpecialCharAllowed"
          class="w-4 h-4 accent-blue-700 outline-none mr-2" />
        <label for="char-allowed" class='text-orange-400'>Sp. Characters</label>
      </div>
    </div>
  </div>
</template>
