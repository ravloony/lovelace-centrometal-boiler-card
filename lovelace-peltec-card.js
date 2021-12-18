import {
  css,
  html,
  LitElement,
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

import PelTecDisplay from "./peltec-display.js"

class LoveacePelTecCard extends LitElement {
  display = new PelTecDisplay()

  static get properties() {
    return {
      hass: {},
      config: {}
    };
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has("config")) {
      console.log("config changed");
      return true;
    }
    if (changedProperties.has("hass")) {
      console.log("hass changed");
      const oldHass = changedProperties.get("hass");
      for (var i = 0; i < this.parameters.length; i++) {
        const parameter = this.parameters[i];
        const oldValue = oldHass.states[this.config[parameter]];
        const newValue = this.hass.states[this.config[parameter]];
        if (oldValue != newValue) {
          console.log("%s : %s != %s", parameter, oldValue.state, newValue.state);
          return true;
        }
      }
      for (var i = 0; i < this.optional_parameters.length; i++) {
        const parameter = this.optional_parameters[i];
        const oldValue = oldHass.states[this.config[parameter]];
        const newValue = this.hass.states[this.config[parameter]];
        if (oldValue != newValue) {
          console.log("%s : %s != %s", parameter, oldValue.state, newValue.state);
          return true;
        }
      };
      return false;
    }
    console.log("unknown changed");
    return false;
  }

  render() {
    const str = this.display.createContent(this.hass, this.config);
    var div = document.createElement('div');
    div.innerHTML = str.trim();
    div = div.firstChild;
    return html`
      <ha-card>${div}</ha-card>`;
  }

  checkParameters(parameters) {
    var missing = [];
    this.parameters.forEach((parameter) => {
      if (!(parameter in this.config)) {
        missing.push(parameter);
      }
    });
    return missing;
  }

  setConfig(config) {
    this.config = config;
    this.parameters = ["peltec_state", "peltec_fire_sensor", "peltec_fan",
      "peltec_boiler_pump", "peltec_boiler_pump_demand", "peltec_electric_heater",
      "peltec_buffer_tank_temparature_up", "peltec_buffer_tank_temparature_down",
      "peltec_lambda_sensor", "peltec_tank_level", "peltec_configuration",
      "peltec_boiler_temperature", "peltec_mixer_temperature", "peltec_mixing_valve",
      "peltec_flue_gas", "peltec_active_command"];
    this.optional_parameters = ["peltec_outdoor_temperature"]
    const missing = this.checkParameters();
    if (missing.length > 0) {
      throw new Error("You need to define: " + missing.join(","));
    }
    this.style.cssText = "display: block;";
  }

  getCardSize() {
    return 6;
  }

}

//


customElements.define('lovelace-peltec-card', LoveacePelTecCard);
