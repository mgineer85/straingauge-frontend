<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h4">System</div>
      </q-card-section>
      <q-card-section>
        System Settings
        <q-form action="/api/config/system" method="post" class="q-gutter-md">
          <q-input
            type="text"
            v-model="configurationStore.config.system.hostname"
            label="hostname"
          />
          <q-toggle
            v-model="configurationStore.config.system.wifi_ap_mode"
            label="ap mode"
          ></q-toggle>
          <q-input
            type="text"
            v-model="configurationStore.config.system.wifi_ap_ssid"
            label="wifi_sta_ssid"
          />
          <q-input
            type="text"
            v-model="configurationStore.config.system.wifi_ap_password"
            label="wifi_sta_password"
          />
        </q-form>
      </q-card-section>
      <q-separator />
    </q-card>
    <q-card class="q-my-md">
      <q-card-section>
        <div class="text-h4">Sensor</div>
      </q-card-section>
      <q-card-section>
        Straing Gauge Settings.
        <q-form action="/api/config/sensor" method="post" class="q-gutter-md">
          <q-input
            type="text"
            v-model="configurationStore.config.sensor.name"
            label="name"
          />
          <q-input
            type="text"
            v-model="configurationStore.config.sensor.serial"
            label="serial"
          />
          <q-input
            type="text"
            v-model="configurationStore.config.sensor.displayunit"
            label="Displayunit"
          />
          <q-input
            type="number"
            v-model="configurationStore.config.sensor.fullrange"
            label="Fullrange"
          />
          <q-input
            type="number"
            v-model="configurationStore.config.sensor.sensitivity"
            label="Sensitivity"
          />
          <q-input
            type="number"
            v-model="configurationStore.config.sensor.zerobalance"
            label="Zerobalance"
          />
        </q-form>
      </q-card-section>
      <q-separator />
    </q-card>
    <q-card class="q-my-md">
      <q-card-section>
        <div class="text-h4">ADC</div>
      </q-card-section>
      <q-card-section>
        Amplifier and ADC.
        <q-form action="/api/config/adc" method="post" class="q-gutter-md">
          <q-select
            v-model="configurationStore.config.adc.ldovoltage"
            :options="options_nau7802_ldovoltage"
            label="Excitation Voltage"
            emit-value
            map-options
          />

          <q-select
            v-model="configurationStore.config.adc.gain"
            :options="options_nau7802_gain"
            label="Preamplifier Gain"
            emit-value
            map-options
          />

          <q-select
            v-model="configurationStore.config.adc.samplerate"
            :options="options_nau7802_samplerate"
            label="Samplerate"
            emit-value
            map-options
          />

          <q-input
            type="number"
            v-model="configurationStore.config.adc.cali_offset"
            label="ADC Offset calibration value"
          />

          <q-input
            type="number"
            v-model="configurationStore.config.adc.cali_gain_factor"
            label="ADC Gain calibration factor"
          />
        </q-form>
      </q-card-section>
      <q-separator />
    </q-card>
    <q-card class="q-my-md">
      <q-card-section>
        <div class="text-h4">Teach In</div>
      </q-card-section>
      <q-card-section>
        Calibrate the force sensor to a known reference. 1. Tare the sensor 2.
        Apply a defined force to the sensor 3. Recalc the new calibration value
        <q-form action="/api/cmd" method="post" class="q-gutter-md">
          <input hidden name="action" value="calibrateToKnownValue" />
          <q-input
            type="text"
            name="knownValue"
            v-model="knownValue"
            label="Known Weight"
          />
          <!-- <q-btn
            label="Calc new calibration value"
            type="submit"
            color="primary"
          /> -->
        </q-form>
      </q-card-section>
      <q-separator />
      <q-card-actions>
        <CmdLink link="/api/cmd/TODO" caption="Teach In Zerobalance" />
        <CmdLink link="/api/cmd/TODO" caption="Teach In Sensitivity" />
      </q-card-actions>
    </q-card>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <div class="q-gutter-xs">
        <CmdLink link="/api/cmd/loadconfiguration" caption="Load Config" />
        <CmdLink link="/api/cmd/saveconfiguration" caption="Persist Config" />
        <q-btn
          label="apply config"
          @click="configurationStore.updateServer()"
          color="primary"
        />
      </div>
    </q-page-sticky>

    <div>
      <p>Download configuration files from system memory:</p>
      <ul>
        <li><a href="/config/system.json" target="_blank">system.json</a></li>
        <li><a href="/config/sensor.json" target="_blank">sensor.json</a></li>
        <li><a href="/config/adc.json" target="_blank">adc.json</a></li>
      </ul>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useMainStore } from "../stores/main-store.js";
import { useConfigurationStore } from "../stores/configuration-store.js";
import CmdLink from "../components/CmdLink.vue";

export default defineComponent({
  name: "SettingsPage",
  components: { CmdLink },
  setup() {
    const store = useMainStore();
    const configurationStore = useConfigurationStore();
    const knownValue = ref(null);

    /*! excitation voltages */
    const options_nau7802_ldovoltage = [
      {
        label: "4,5 V",
        value: 0,
      },
      {
        label: "4,2 V",
        value: 1,
      },
      {
        label: "3,9 V",
        value: 2,
      },
      {
        label: "3,6 V",
        value: 3,
      },
      {
        label: "3,3 V",
        value: 4,
      },
      {
        label: "3,0 V",
        value: 5,
      },
      {
        label: "2,7 V",
        value: 6,
      },
      {
        label: "2,4 V",
        value: 7,
      },
      {
        label: "external",
        value: 8,
      },
    ];

    /*! The possible gains */
    const options_nau7802_gain = [
      {
        label: "1x",
        value: 0,
      },
      {
        label: "2x",
        value: 1,
      },
      {
        label: "4x",
        value: 2,
      },
      {
        label: "8x",
        value: 3,
      },
      {
        label: "16x",
        value: 4,
      },
      {
        label: "32x",
        value: 5,
      },
      {
        label: "64x",
        value: 6,
      },
      {
        label: "128x",
        value: 7,
      },
    ];

    /*! The possible sample rates */
    const options_nau7802_samplerate = [
      {
        label: "10 SPS",
        value: 0,
      },
      {
        label: "20 SPS",
        value: 1,
      },
      {
        label: "40 SPS",
        value: 2,
      },
      {
        label: "80 SPS",
        value: 3,
      },
      {
        label: "320 SPS",
        value: 7,
      },
    ];

    return {
      store,
      configurationStore,
      knownValue,

      options_nau7802_ldovoltage,
      options_nau7802_gain,
      options_nau7802_samplerate,
    };
  },
});
</script>
