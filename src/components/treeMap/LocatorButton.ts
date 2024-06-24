import { Control, DomUtil, Map } from "leaflet";
import { createControlComponent } from "@react-leaflet/core";

const node = DomUtil.create("button");

const locatorIcon = import.meta.env.PROD
  ? "current-location-icon.png"
  : "/current-location-icon.png";

const LocatorButtonTemplate = Control.extend({
  options: {
    position: "topleft",
  },
  onAdd: function (map: Map) {
    node.innerHTML = `<img src="${locatorIcon}" class="locationIcon"/>`;
    node.onclick = () => {
      map.locate();
    };
    return node;
  },
  onRemove: function () {},
});
//Use react-leaflet createControlComponent for consistency with parent component
export const LocatorButton = createControlComponent(
  (props: any) => new LocatorButtonTemplate(props)
);
