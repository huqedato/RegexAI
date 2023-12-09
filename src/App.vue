

<template>
  <div v-if="activeModal">
    <transition name="bounce" mode="out-in">
      <KeyModal @close="activeModal = false"></KeyModal>
    </transition>
  </div>

  <div id="menu">
    <span>
      <select v-model="chosenModel">
        <option v-for="model in GPTmodels" :key="model" :value="model">{{ model }}</option>
      </select>
    </span>
    <span>
      <select v-model="language">
        <option v-for='lang in languages' :value="lang">{{ lang }}</option>
      </select>
    </span>
  </div>
  <div id="key" @click="activeModal = true">API Key</div>
  <div>
    <a href="https://github.com/huqedato/RegexAI" target="_blank" rel="noopener noreferrer">
      <img class="logo" src="./assets/logo3.png" alt="logo" title="RegexAi on Github" />
    </a>
  </div>
  <Header first="Regex" last="Ai" />

  <div class="container">
    <button class="item1" @click="ApiCall(0)" v-on:mouseover="mouseover(0)">Create
      Regexp</button>
    <button class="item3" @click="ApiCall(2)" v-on:mouseover="mouseover(2)">Explain Regexp</button>
    <button class="item2" @click="ApiCall(1)" v-on:mouseover="mouseover(1)">Use Regexp in {{ language }}</button>
    <div class="item4">
      <textarea v-bind:disabled="textareaDisabled" v-model="queryArea" name="query" id="query" rows="2"
        :placeholder="placeholder"></textarea>
    </div>
    <div class="result card" v-show="resActive" :class="{ resultWaiting: textareaDisabled }">
      <div>
        <pre>{{ result }}</pre>
      </div>
      <button class="arrow" @click="copyResToTextArea">⟲</button>
    </div>
  </div>
</template>

<script >
const languages = ["Ada", "AWK", "Bash", "C", "C#", "C++", "Clojure", "COBOL", "Crystal", "D", "Dart", "Delphi", "Elixir", "Elm", "Erlang", "F#", "Go", "Groovy", "Haskell", "Io", "Java", "JavaScript", "Julia", "Kotlin", "Lisp", "Lua", "Matlab", "Nim", "OCaml", "Objective-C", "Pascal", "Perl", "PHP", "PowerShell", "Prolog", "Python", "R", "Ruby", "Rust", "Sed", "Scala", "Scheme", "Scratch", "Smalltalk", "Swift", "Tcl", "Vimscript", "Visual Basic", "Zig"];

import KeyModal from "./components/key.vue";
import Header from "./components/Header.vue";
import * as API from "./components/ApiCall.js";
export default {
  data() {
    return {
      resActive: false,
      queryArea: "",
      result: "",
      language: null,
      languages: languages,
      textareaDisabled: false,
      GPTmodels: null,
      chosenModel: "gpt-3.5-turbo",
      placeholder: "Enter your text here",
      activeModal: false
    };
  },
  components: {
    Header,
    KeyModal
  },

  methods: {
    ApiCall: async function (type) {
      if (this.queryArea == "") return;
      this.resActive = true;
      this.textareaDisabled = true;
      this.result = "AI thinking...";
      await API.RegexAiApiCall(type, window.localStorage.getItem("OpenAIKey"), this.queryArea, this.language, this.chosenModel).then((res) => {
        this.result = res;
        this.textareaDisabled = false;
      });

    },
    copyResToTextArea: function () {
      this.queryArea = this.result.replaceAll("<br/ >", "");
    },
    mouseover: function (type) {
      if (type == 0) {
        this.placeholder = "Provide the description or pattern you want me to create a regular expression for:";
      } else if (type == 1) {
        this.placeholder = "Create a code in " + this.language + " to match a variable str against this regular expression: ";
      } else if (type == 2) {
        this.placeholder = "Explain the following regular expression:";
      }
    }
  },
  mounted() {
    if (window.localStorage.getItem("OpenAIKey") == null) {
      this.activeModal = true;
    }
    this.language = "JavaScript";
    API.AvailableModels(window.localStorage.getItem("OpenAIKey")).then((res) => {
      this.GPTmodels = res.map((x) => x.id);
    });
  }
};
</script>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
