import { Control, DomUtil, Map } from "leaflet";
import { createControlComponent } from "@react-leaflet/core";

const node = DomUtil.create("button");

const LocatorButtonTemplate = Control.extend({
  options: {
    position: "topleft",
  },
  onAdd: function (map: Map) {
    node.innerHTML = `<img src="/current-location-icon.png" class="smallIcon"/>`;
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
