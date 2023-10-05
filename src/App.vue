<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { useMainStore } from "stores/main-store.js";
import { useConfigurationStore } from "stores/configuration-store.js";
let sseClient;

export default defineComponent({
  name: "App",
  setup() {
    const store = useMainStore();
    const configurationStore = useConfigurationStore();
    let sseClient = null;

    return {
      // you can return the whole store instance to use it in the template
      store,
      configurationStore,
    };
  },
  methods: {
    async init() {
      this.configurationStore.initStore();

      await this.until((_) => this.configurationStore.isLoaded == true);

      this.initSseClient();
    },

    until(conditionFunction) {
      const poll = (resolve) => {
        if (conditionFunction()) resolve();
        else setTimeout((_) => poll(resolve), 400);
      };

      return new Promise(poll);
    },

    initSseClient() {
      console.log("init sse client");

      sseClient = this.$sse
        .create("/events")
        .on("message", (message, lastEventId) => {
          console.info(
            "Received a message w/o an event!",
            message,
            lastEventId
          );
          this.store.messages = [
            `${message} (Msg received, lastEventId: ${lastEventId})`,
            ...this.store.messages.slice(0, 10),
          ];
        }) // "message" and "" and null equal!
        .on("error", (err) =>
          console.error("Failed to parse or lost connection:", err)
        )
        .on("force", (force) => {
          this.store.force = force;
          this.store.graph.data = [
            {
              x: ++this.store.currentTick,
              y: force,
            },
            ...this.store.graph.data.slice(0, 10),
          ];
        })
        .on("reading", (value) => {
          this.store.reading = value;
        })
        .on("battery", (value) => {
          this.store.battery = value;
        })
        .on("ping", (value) => {
          this.store.ping = value;
        })
        .connect()
        .then((sse) => {
          console.log("We're connected!");
        })
        .catch((err) => console.error("Failed make initial connection:", err));
    },
  },

  async created() {
    console.log("app created, waiting for stores to init first dataset");
    this.init();
    console.log("data initialization finished");
  },

  mounted() {},
});
</script>
