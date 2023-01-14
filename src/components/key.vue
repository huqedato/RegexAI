<template>
    <div class="modal">

        <div class="modal-content">
            <h3>
                OpenAI API Key
            </h3>
            <div> <input type="text" name="" id="" v-model="key"></div>
            <div><button v-on:click="hide">Ok</button></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            key: window.localStorage.getItem('OpenAIKey')
        }
    },
    name: "KeyModal",
    methods: {
        hide() {
            this.HandleKey();
            this.$emit('close')
        },
        HandleKey() {
            window.localStorage.removeItem('OpenAIKey');
            window.localStorage.setItem('OpenAIKey', this.key);
        }
    },

}
</script>

<style scoped>
.bounce-enter-active {
    animation: bounce-in .5s ease-out both;
}

.bounce-leave-active {
    animation: bounce-in .5s reverse ease-in both;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.10);
    }

    100% {
        transform: scale(1);
    }
}
</style>