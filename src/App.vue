<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { Bot, Moon, Sun, Monitor, Github, Send } from "lucide-vue-next";
import MethodSidebar from "@/components/MethodSidebar.vue";
import TokenBox from "@/components/TokenBox.vue";
import ParameterForm from "@/components/ParameterForm.vue";
import ResultRail from "@/components/ResultRail.vue";
import ToastStack from "@/components/ToastStack.vue";
import { useTelegramStudio } from "@/composables/useTelegramStudio";

const studio = useTelegramStudio();
const {
  schema,
  selected,
  values,
  requestJson,
  requestJsonError,
  token,
  search,
  category,
  categories,
  filteredMethods,
  formError,
  response,
  loadingSchema,
  notices,
  loadSchema,
  selectMethod,
  submit,
  copy
} = studio;
const theme = ref(localStorage.getItem("bot-studio.theme") || "system");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

const resolvedTheme = computed(() => (theme.value === "system" ? (systemDark.matches ? "dark" : "light") : theme.value));
const themeIcon = computed(() => (theme.value === "dark" ? Moon : theme.value === "light" ? Sun : Monitor));

function applyTheme() {
  document.documentElement.dataset.theme = resolvedTheme.value;
  document.documentElement.dataset.themeMode = theme.value;
}

watch(theme, () => {
  localStorage.setItem("bot-studio.theme", theme.value);
  applyTheme();
});

onMounted(async () => {
  applyTheme();
  systemDark.addEventListener("change", applyTheme);
  await loadSchema();
});
</script>

<template>
  <div class="app-shell">
    <ToastStack :notices="notices" />

    <header class="sticky top-0 z-30 border-b border-ink-950/10 bg-paper-50/86 px-4 py-3 backdrop-blur-2xl dark:border-paper-50/10 dark:bg-black/86 sm:px-6">
      <div class="mx-auto flex w-full max-w-[1540px] flex-row items-center justify-between gap-3">
        <div class="flex min-w-0 items-center gap-3">
          <div class="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-ink-950 text-paper-50 dark:bg-paper-50 dark:text-ink-950">
            <Bot class="h-6 w-6" />
          </div>
          <div class="min-w-0">
            <h1 class="truncate text-xl font-black tracking-normal">Bot Studio</h1>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <div class="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-950/10 bg-paper-100 px-3 text-sm font-bold text-ink-700 dark:border-paper-50/10 dark:bg-ink-900 dark:text-paper-300">
            <component :is="themeIcon" class="h-4 w-4" />
            <select v-model="theme" class="bg-transparent text-ink-950 outline-none dark:text-paper-50" aria-label="Theme">
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <a class="icon-button" href="https://github.com/telefunction/bot-studio" target="_blank" rel="noreferrer" title="telefunction">
            <Github class="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>

    <main class="mx-auto grid w-full max-w-[1540px] grid-cols-1 gap-4 p-3 sm:p-4 xl:grid-cols-[19rem_minmax(0,1.7fr)_23rem]">
      <MethodSidebar
        v-model:search="search"
        v-model:category="category"
        :categories="categories"
        :methods="filteredMethods"
        :selected-name="selected?.name"
        :loading="loadingSchema"
        @select="selectMethod"
      />

      <section class="panel rounded-xl p-4 sm:p-5">
        <div class="border-b border-ink-950/10 pb-5 dark:border-paper-50/10">
          <div class="flex min-w-0 items-start justify-between gap-3">
            <div class="min-w-0">
              <h2 class="break-words text-3xl font-black leading-none tracking-normal sm:text-5xl">
                {{ selected?.name || "Select a method" }}
              </h2>
              <p class="mt-3 max-w-4xl text-sm leading-7 text-ink-700 dark:text-paper-300">
                {{
                  selected?.description ||
                  "Search or browse the generated Telegram Bot API schema, then choose a method to build a request."
                }}
              </p>
            </div>
            <a
              class="icon-button"
              :href="selected?.officialUrl || schema?.source || 'https://core.telegram.org/bots/api'"
              target="_blank"
              rel="noreferrer"
              title="Official docs"
            >
              ↗
            </a>
          </div>
        </div>

        <TokenBox v-model="token" :method-name="selected?.name" />

        <form class="mt-5" @submit.prevent="submit">
          <ParameterForm v-model="values" :method="selected" />

          <div v-if="formError" class="mt-4 rounded-lg border border-signal-red/30 bg-signal-red/10 p-3 text-sm font-semibold text-signal-red">
            {{ formError }}
          </div>

          <div class="mt-5 flex flex-col gap-2 sm:flex-row">
            <button
              class="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-ink-950 bg-ink-950 px-4 font-black text-paper-50 transition hover:-translate-y-0.5 hover:bg-ink-800 disabled:hover:translate-y-0 dark:border-paper-50 dark:bg-paper-50 dark:text-ink-950"
              type="submit"
              :disabled="!selected || response.status === 'loading'"
            >
              <Send class="h-4 w-4" />
              {{ response.status === "loading" ? "Sending..." : "Submit to Telegram" }}
            </button>
          </div>
        </form>
      </section>

      <ResultRail
        v-model:request-json="requestJson"
        :request-error="requestJsonError"
        :response="response"
        @copy-request="copy(requestJson, 'Request JSON')"
        @copy-response="response.payload && copy(JSON.stringify(response.payload, null, 2), 'Response JSON')"
      />
    </main>

    <footer
      class="mx-auto mt-8 flex w-full max-w-[1540px] flex-col items-center justify-center gap-2 px-4 pb-5 text-center text-sm font-semibold text-ink-700 dark:text-paper-300 sm:flex-row sm:justify-between sm:text-left">
      <div>
        Powered by
        <a class="font-black text-signal-blue hover:underline" href="https://github.com/telefunction" target="_blank"
          rel="noreferrer">
          @Telefunction
        </a>
      </div>

      <div
        class="flex flex-nowrap items-center justify-center gap-2 whitespace-nowrap font-mono text-xs uppercase tracking-normal">
        <span>{{ schema?.methodCount || 0 }} methods</span>
        <span>·</span>
        <span>{{ schema?.typeCount || 0 }} types</span>
      </div>
    </footer>
  </div>
</template>
