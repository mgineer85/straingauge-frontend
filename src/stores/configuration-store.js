import { defineStore } from "pinia";

const STATES = {
  INIT: 0,
  DONE: 1,
  WIP: 2,
  ERROR: 3,
};

export const useConfigurationStore = defineStore("configuration-store", {
  state: () => ({
    config: {
      system: {
        hostname: null,

        wifi_ap_mode: null,
        wifi_ap_ssid: null,
        wifi_ap_password: null,

        wifi_sta_ssid: null,
        wifi_sta_password: null,
      },

      loadcell: {
        name: null,
        serial: null,
        fullrange: null,
        sensitivity: null,
        zerobalance: null,
        displayunit: null,
      },
    },

    storeState: STATES.INIT,
  }),
  actions: {
    initStore(forceReload = false) {
      console.log("init store");

      if (this.isLoaded && forceReload == false) {
        console.log("items loaded once already, skipping");
        return;
      }

      this.storeState = STATES.WIP;

      fetch("/api/config")
        .then((res) => {
          console.log(res);

          return res.json();
        })
        .then((json) => {
          console.log("Checkout this JSON! ", json);
          this.config = json;

          this.storeState = STATES.DONE;
        })
        .catch((err) => {
          console.log("ERROR: ", err);

          this.storeState = STATES.ERROR;
        });
    },
    updateServer() {
      console.log("store send to server");

      fetch("/api/config", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.config),
      })
        .then((res) => {
          console.log(res);

          return res.json();
        })
        .then((json) => {
          console.log("Checkout this JSON! ", json);
          this.initStore(true);
        })
        .catch((err) => {
          console.log("ERROR: ", err);
        });
    },
  },
  getters: {
    isLoaded() {
      return this.storeState === STATES.DONE;
    },
    isLoading() {
      return this.storeState === STATES.WIP;
    },
  },
});
