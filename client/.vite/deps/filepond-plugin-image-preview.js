import "./chunk-OL46QLBJ.js";

// node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js
var isPreviewableImage = (file) => /^image/.test(file.type);
var vectorMultiply = (v, amount) => createVector(v.x * amount, v.y * amount);
var vectorAdd = (a, b) => createVector(a.x + b.x, a.y + b.y);
var vectorNormalize = (v) => {
  const l = Math.sqrt(v.x * v.x + v.y * v.y);
  if (l === 0) {
    return {
      x: 0,
      y: 0
    };
  }
  return createVector(v.x / l, v.y / l);
};
var vectorRotate = (v, radians, origin) => {
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const t = createVector(v.x - origin.x, v.y - origin.y);
  return createVector(
    origin.x + cos * t.x - sin * t.y,
    origin.y + sin * t.x + cos * t.y
  );
};
var createVector = (x = 0, y = 0) => ({ x, y });
var getMarkupValue = (value, size, scalar = 1, axis) => {
  if (typeof value === "string") {
    return parseFloat(value) * scalar;
  }
  if (typeof value === "number") {
    return value * (axis ? size[axis] : Math.min(size.width, size.height));
  }
  return;
};
var getMarkupStyles = (markup, size, scale) => {
  const lineStyle = markup.borderStyle || markup.lineStyle || "solid";
  const fill = markup.backgroundColor || markup.fontColor || "transparent";
  const stroke = markup.borderColor || markup.lineColor || "transparent";
  const strokeWidth = getMarkupValue(
    markup.borderWidth || markup.lineWidth,
    size,
    scale
  );
  const lineCap = markup.lineCap || "round";
  const lineJoin = markup.lineJoin || "round";
  const dashes = typeof lineStyle === "string" ? "" : lineStyle.map((v) => getMarkupValue(v, size, scale)).join(",");
  const opacity = markup.opacity || 1;
  return {
    "stroke-linecap": lineCap,
    "stroke-linejoin": lineJoin,
    "stroke-width": strokeWidth || 0,
    "stroke-dasharray": dashes,
    stroke,
    fill,
    opacity
  };
};
var isDefined = (value) => value != null;
var getMarkupRect = (rect, size, scalar = 1) => {
  let left = getMarkupValue(rect.x, size, scalar, "width") || getMarkupValue(rect.left, size, scalar, "width");
  let top = getMarkupValue(rect.y, size, scalar, "height") || getMarkupValue(rect.top, size, scalar, "height");
  let width = getMarkupValue(rect.width, size, scalar, "width");
  let height = getMarkupValue(rect.height, size, scalar, "height");
  let right = getMarkupValue(rect.right, size, scalar, "width");
  let bottom = getMarkupValue(rect.bottom, size, scalar, "height");
  if (!isDefined(top)) {
    if (isDefined(height) && isDefined(bottom)) {
      top = size.height - height - bottom;
    } else {
      top = bottom;
    }
  }
  if (!isDefined(left)) {
    if (isDefined(width) && isDefined(right)) {
      left = size.width - width - right;
    } else {
      left = right;
    }
  }
  if (!isDefined(width)) {
    if (isDefined(left) && isDefined(right)) {
      width = size.width - left - right;
    } else {
      width = 0;
    }
  }
  if (!isDefined(height)) {
    if (isDefined(top) && isDefined(bottom)) {
      height = size.height - top - bottom;
    } else {
      height = 0;
    }
  }
  return {
    x: left || 0,
    y: top || 0,
    width: width || 0,
    height: height || 0
  };
};
var pointsToPathShape = (points) => points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
var setAttributes = (element, attr) => Object.keys(attr).forEach((key) => element.setAttribute(key, attr[key]));
var ns = "http://www.w3.org/2000/svg";
var svg = (tag, attr) => {
  const element = document.createElementNS(ns, tag);
  if (attr) {
    setAttributes(element, attr);
  }
  return element;
};
var updateRect = (element) => setAttributes(element, {
  ...element.rect,
  ...element.styles
});
var updateEllipse = (element) => {
  const cx = element.rect.x + element.rect.width * 0.5;
  const cy = element.rect.y + element.rect.height * 0.5;
  const rx = element.rect.width * 0.5;
  const ry = element.rect.height * 0.5;
  return setAttributes(element, {
    cx,
    cy,
    rx,
    ry,
    ...element.styles
  });
};
var IMAGE_FIT_STYLE = {
  contain: "xMidYMid meet",
  cover: "xMidYMid slice"
};
var updateImage = (element, markup) => {
  setAttributes(element, {
    ...element.rect,
    ...element.styles,
    preserveAspectRatio: IMAGE_FIT_STYLE[markup.fit] || "none"
  });
};
var TEXT_ANCHOR = {
  left: "start",
  center: "middle",
  right: "end"
};
var updateText = (element, markup, size, scale) => {
  const fontSize = getMarkupValue(markup.fontSize, size, scale);
  const fontFamily = markup.fontFamily || "sans-serif";
  const fontWeight = markup.fontWeight || "normal";
  const textAlign = TEXT_ANCHOR[markup.textAlign] || "start";
  setAttributes(element, {
    ...element.rect,
    ...element.styles,
    "stroke-width": 0,
    "font-weight": fontWeight,
    "font-size": fontSize,
    "font-family": fontFamily,
    "text-anchor": textAlign
  });
  if (element.text !== markup.text) {
    element.text = markup.text;
    element.textContent = markup.text.length ? markup.text : " ";
  }
};
var updateLine = (element, markup, size, scale) => {
  setAttributes(element, {
    ...element.rect,
    ...element.styles,
    fill: "none"
  });
  const line = element.childNodes[0];
  const begin = element.childNodes[1];
  const end = element.childNodes[2];
  const origin = element.rect;
  const target = {
    x: element.rect.x + element.rect.width,
    y: element.rect.y + element.rect.height
  };
  setAttributes(line, {
    x1: origin.x,
    y1: origin.y,
    x2: target.x,
    y2: target.y
  });
  if (!markup.lineDecoration) return;
  begin.style.display = "none";
  end.style.display = "none";
  const v = vectorNormalize({
    x: target.x - origin.x,
    y: target.y - origin.y
  });
  const l = getMarkupValue(0.05, size, scale);
  if (markup.lineDecoration.indexOf("arrow-begin") !== -1) {
    const arrowBeginRotationPoint = vectorMultiply(v, l);
    const arrowBeginCenter = vectorAdd(origin, arrowBeginRotationPoint);
    const arrowBeginA = vectorRotate(origin, 2, arrowBeginCenter);
    const arrowBeginB = vectorRotate(origin, -2, arrowBeginCenter);
    setAttributes(begin, {
      style: "display:block;",
      d: `M${arrowBeginA.x},${arrowBeginA.y} L${origin.x},${origin.y} L${arrowBeginB.x},${arrowBeginB.y}`
    });
  }
  if (markup.lineDecoration.indexOf("arrow-end") !== -1) {
    const arrowEndRotationPoint = vectorMultiply(v, -l);
    const arrowEndCenter = vectorAdd(target, arrowEndRotationPoint);
    const arrowEndA = vectorRotate(target, 2, arrowEndCenter);
    const arrowEndB = vectorRotate(target, -2, arrowEndCenter);
    setAttributes(end, {
      style: "display:block;",
      d: `M${arrowEndA.x},${arrowEndA.y} L${target.x},${target.y} L${arrowEndB.x},${arrowEndB.y}`
    });
  }
};
var updatePath = (element, markup, size, scale) => {
  setAttributes(element, {
    ...element.styles,
    fill: "none",
    d: pointsToPathShape(
      markup.points.map((point) => ({
        x: getMarkupValue(point.x, size, scale, "width"),
        y: getMarkupValue(point.y, size, scale, "height")
      }))
    )
  });
};
var createShape = (node) => (markup) => svg(node, { id: markup.id });
var createImage = (markup) => {
  const shape = svg("image", {
    id: markup.id,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    opacity: "0"
  });
  shape.onload = () => {
    shape.setAttribute("opacity", markup.opacity || 1);
  };
  shape.setAttributeNS(
    "http://www.w3.org/1999/xlink",
    "xlink:href",
    markup.src
  );
  return shape;
};
var createLine = (markup) => {
  const shape = svg("g", {
    id: markup.id,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  });
  const line = svg("line");
  shape.appendChild(line);
  const begin = svg("path");
  shape.appendChild(begin);
  const end = svg("path");
  shape.appendChild(end);
  return shape;
};
var CREATE_TYPE_ROUTES = {
  image: createImage,
  rect: createShape("rect"),
  ellipse: createShape("ellipse"),
  text: createShape("text"),
  path: createShape("path"),
  line: createLine
};
var UPDATE_TYPE_ROUTES = {
  rect: updateRect,
  ellipse: updateEllipse,
  image: updateImage,
  text: updateText,
  path: updatePath,
  line: updateLine
};
var createMarkupByType = (type, markup) => CREATE_TYPE_ROUTES[type](markup);
var updateMarkupByType = (element, type, markup, size, scale) => {
  if (type !== "path") {
    element.rect = getMarkupRect(markup, size, scale);
  }
  element.styles = getMarkupStyles(markup, size, scale);
  UPDATE_TYPE_ROUTES[type](element, markup, size, scale);
};
var MARKUP_RECT = [
  "x",
  "y",
  "left",
  "top",
  "right",
  "bottom",
  "width",
  "height"
];
var toOptionalFraction = (value) => typeof value === "string" && /%/.test(value) ? parseFloat(value) / 100 : value;
var prepareMarkup = (markup) => {
  const [type, props] = markup;
  const rect = props.points ? {} : MARKUP_RECT.reduce((prev, curr) => {
    prev[curr] = toOptionalFraction(props[curr]);
    return prev;
  }, {});
  return [
    type,
    {
      zIndex: 0,
      ...props,
      ...rect
    }
  ];
};
var sortMarkupByZIndex = (a, b) => {
  if (a[1].zIndex > b[1].zIndex) {
    return 1;
  }
  if (a[1].zIndex < b[1].zIndex) {
    return -1;
  }
  return 0;
};
var createMarkupView = (_) => _.utils.createView({
  name: "image-preview-markup",
  tag: "svg",
  ignoreRect: true,
  mixins: {
    apis: ["width", "height", "crop", "markup", "resize", "dirty"]
  },
  write: ({ root, props }) => {
    if (!props.dirty) return;
    const { crop, resize, markup } = props;
    const viewWidth = props.width;
    const viewHeight = props.height;
    let cropWidth = crop.width;
    let cropHeight = crop.height;
    if (resize) {
      const { size: size2 } = resize;
      let outputWidth = size2 && size2.width;
      let outputHeight = size2 && size2.height;
      const outputFit = resize.mode;
      const outputUpscale = resize.upscale;
      if (outputWidth && !outputHeight) outputHeight = outputWidth;
      if (outputHeight && !outputWidth) outputWidth = outputHeight;
      const shouldUpscale = cropWidth < outputWidth && cropHeight < outputHeight;
      if (!shouldUpscale || shouldUpscale && outputUpscale) {
        let scalarWidth = outputWidth / cropWidth;
        let scalarHeight = outputHeight / cropHeight;
        if (outputFit === "force") {
          cropWidth = outputWidth;
          cropHeight = outputHeight;
        } else {
          let scalar;
          if (outputFit === "cover") {
            scalar = Math.max(scalarWidth, scalarHeight);
          } else if (outputFit === "contain") {
            scalar = Math.min(scalarWidth, scalarHeight);
          }
          cropWidth = cropWidth * scalar;
          cropHeight = cropHeight * scalar;
        }
      }
    }
    const size = {
      width: viewWidth,
      height: viewHeight
    };
    root.element.setAttribute("width", size.width);
    root.element.setAttribute("height", size.height);
    const scale = Math.min(viewWidth / cropWidth, viewHeight / cropHeight);
    root.element.innerHTML = "";
    const markupFilter = root.query("GET_IMAGE_PREVIEW_MARKUP_FILTER");
    markup.filter(markupFilter).map(prepareMarkup).sort(sortMarkupByZIndex).forEach((markup2) => {
      const [type, settings] = markup2;
      const element = createMarkupByType(type, settings);
      updateMarkupByType(element, type, settings, size, scale);
      root.element.appendChild(element);
    });
  }
});
var createVector$1 = (x, y) => ({ x, y });
var vectorDot = (a, b) => a.x * b.x + a.y * b.y;
var vectorSubtract = (a, b) => createVector$1(a.x - b.x, a.y - b.y);
var vectorDistanceSquared = (a, b) => vectorDot(vectorSubtract(a, b), vectorSubtract(a, b));
var vectorDistance = (a, b) => Math.sqrt(vectorDistanceSquared(a, b));
var getOffsetPointOnEdge = (length, rotation) => {
  const a = length;
  const A = 1.5707963267948966;
  const B = rotation;
  const C = 1.5707963267948966 - rotation;
  const sinA = Math.sin(A);
  const sinB = Math.sin(B);
  const sinC = Math.sin(C);
  const cosC = Math.cos(C);
  const ratio = a / sinA;
  const b = ratio * sinB;
  const c = ratio * sinC;
  return createVector$1(cosC * b, cosC * c);
};
var getRotatedRectSize = (rect, rotation) => {
  const w = rect.width;
  const h = rect.height;
  const hor = getOffsetPointOnEdge(w, rotation);
  const ver = getOffsetPointOnEdge(h, rotation);
  const tl = createVector$1(rect.x + Math.abs(hor.x), rect.y - Math.abs(hor.y));
  const tr = createVector$1(
    rect.x + rect.width + Math.abs(ver.y),
    rect.y + Math.abs(ver.x)
  );
  const bl = createVector$1(
    rect.x - Math.abs(ver.y),
    rect.y + rect.height - Math.abs(ver.x)
  );
  return {
    width: vectorDistance(tl, tr),
    height: vectorDistance(tl, bl)
  };
};
var calculateCanvasSize = (image, canvasAspectRatio, zoom = 1) => {
  const imageAspectRatio = image.height / image.width;
  let canvasWidth = 1;
  let canvasHeight = canvasAspectRatio;
  let imgWidth = 1;
  let imgHeight = imageAspectRatio;
  if (imgHeight > canvasHeight) {
    imgHeight = canvasHeight;
    imgWidth = imgHeight / imageAspectRatio;
  }
  const scalar = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
  const width = image.width / (zoom * scalar * imgWidth);
  const height = width * canvasAspectRatio;
  return {
    width,
    height
  };
};
var getImageRectZoomFactor = (imageRect, cropRect, rotation, center) => {
  const cx = center.x > 0.5 ? 1 - center.x : center.x;
  const cy = center.y > 0.5 ? 1 - center.y : center.y;
  const imageWidth = cx * 2 * imageRect.width;
  const imageHeight = cy * 2 * imageRect.height;
  const rotatedCropSize = getRotatedRectSize(cropRect, rotation);
  return Math.max(
    rotatedCropSize.width / imageWidth,
    rotatedCropSize.height / imageHeight
  );
};
var getCenteredCropRect = (container, aspectRatio) => {
  let width = container.width;
  let height = width * aspectRatio;
  if (height > container.height) {
    height = container.height;
    width = height / aspectRatio;
  }
  const x = (container.width - width) * 0.5;
  const y = (container.height - height) * 0.5;
  return {
    x,
    y,
    width,
    height
  };
};
var getCurrentCropSize = (imageSize, crop = {}) => {
  let { zoom, rotation, center, aspectRatio } = crop;
  if (!aspectRatio) aspectRatio = imageSize.height / imageSize.width;
  const canvasSize = calculateCanvasSize(imageSize, aspectRatio, zoom);
  const canvasCenter = {
    x: canvasSize.width * 0.5,
    y: canvasSize.height * 0.5
  };
  const stage = {
    x: 0,
    y: 0,
    width: canvasSize.width,
    height: canvasSize.height,
    center: canvasCenter
  };
  const shouldLimit = typeof crop.scaleToFit === "undefined" || crop.scaleToFit;
  const stageZoomFactor = getImageRectZoomFactor(
    imageSize,
    getCenteredCropRect(stage, aspectRatio),
    rotation,
    shouldLimit ? center : { x: 0.5, y: 0.5 }
  );
  const scale = zoom * stageZoomFactor;
  return {
    widthFloat: canvasSize.width / scale,
    heightFloat: canvasSize.height / scale,
    width: Math.round(canvasSize.width / scale),
    height: Math.round(canvasSize.height / scale)
  };
};
var IMAGE_SCALE_SPRING_PROPS = {
  type: "spring",
  stiffness: 0.5,
  damping: 0.45,
  mass: 10
};
var createBitmapView = (_) => _.utils.createView({
  name: "image-bitmap",
  ignoreRect: true,
  mixins: { styles: ["scaleX", "scaleY"] },
  create: ({ root, props }) => {
    root.appendChild(props.image);
  }
});
var createImageCanvasWrapper = (_) => _.utils.createView({
  name: "image-canvas-wrapper",
  tag: "div",
  ignoreRect: true,
  mixins: {
    apis: ["crop", "width", "height"],
    styles: [
      "originX",
      "originY",
      "translateX",
      "translateY",
      "scaleX",
      "scaleY",
      "rotateZ"
    ],
    animations: {
      originX: IMAGE_SCALE_SPRING_PROPS,
      originY: IMAGE_SCALE_SPRING_PROPS,
      scaleX: IMAGE_SCALE_SPRING_PROPS,
      scaleY: IMAGE_SCALE_SPRING_PROPS,
      translateX: IMAGE_SCALE_SPRING_PROPS,
      translateY: IMAGE_SCALE_SPRING_PROPS,
      rotateZ: IMAGE_SCALE_SPRING_PROPS
    }
  },
  create: ({ root, props }) => {
    props.width = props.image.width;
    props.height = props.image.height;
    root.ref.bitmap = root.appendChildView(
      root.createChildView(createBitmapView(_), { image: props.image })
    );
  },
  write: ({ root, props }) => {
    const { flip } = props.crop;
    const { bitmap } = root.ref;
    bitmap.scaleX = flip.horizontal ? -1 : 1;
    bitmap.scaleY = flip.vertical ? -1 : 1;
  }
});
var createClipView = (_) => _.utils.createView({
  name: "image-clip",
  tag: "div",
  ignoreRect: true,
  mixins: {
    apis: [
      "crop",
      "markup",
      "resize",
      "width",
      "height",
      "dirty",
      "background"
    ],
    styles: ["width", "height", "opacity"],
    animations: {
      opacity: { type: "tween", duration: 250 }
    }
  },
  didWriteView: function({ root, props }) {
    if (!props.background) return;
    root.element.style.backgroundColor = props.background;
  },
  create: ({ root, props }) => {
    root.ref.image = root.appendChildView(
      root.createChildView(
        createImageCanvasWrapper(_),
        Object.assign({}, props)
      )
    );
    root.ref.createMarkup = () => {
      if (root.ref.markup) return;
      root.ref.markup = root.appendChildView(
        root.createChildView(createMarkupView(_), Object.assign({}, props))
      );
    };
    root.ref.destroyMarkup = () => {
      if (!root.ref.markup) return;
      root.removeChildView(root.ref.markup);
      root.ref.markup = null;
    };
    const transparencyIndicator = root.query(
      "GET_IMAGE_PREVIEW_TRANSPARENCY_INDICATOR"
    );
    if (transparencyIndicator === null) return;
    if (transparencyIndicator === "grid") {
      root.element.dataset.transparencyIndicator = transparencyIndicator;
    } else {
      root.element.dataset.transparencyIndicator = "color";
    }
  },
  write: ({ root, props, shouldOptimize }) => {
    const { crop, markup, resize, dirty, width, height } = props;
    root.ref.image.crop = crop;
    const stage = {
      x: 0,
      y: 0,
      width,
      height,
      center: {
        x: width * 0.5,
        y: height * 0.5
      }
    };
    const image = {
      width: root.ref.image.width,
      height: root.ref.image.height
    };
    const origin = {
      x: crop.center.x * image.width,
      y: crop.center.y * image.height
    };
    const translation = {
      x: stage.center.x - image.width * crop.center.x,
      y: stage.center.y - image.height * crop.center.y
    };
    const rotation = Math.PI * 2 + crop.rotation % (Math.PI * 2);
    const cropAspectRatio = crop.aspectRatio || image.height / image.width;
    const shouldLimit = typeof crop.scaleToFit === "undefined" || crop.scaleToFit;
    const stageZoomFactor = getImageRectZoomFactor(
      image,
      getCenteredCropRect(stage, cropAspectRatio),
      rotation,
      shouldLimit ? crop.center : { x: 0.5, y: 0.5 }
    );
    const scale = crop.zoom * stageZoomFactor;
    if (markup && markup.length) {
      root.ref.createMarkup();
      root.ref.markup.width = width;
      root.ref.markup.height = height;
      root.ref.markup.resize = resize;
      root.ref.markup.dirty = dirty;
      root.ref.markup.markup = markup;
      root.ref.markup.crop = getCurrentCropSize(image, crop);
    } else if (root.ref.markup) {
      root.ref.destroyMarkup();
    }
    const imageView = root.ref.image;
    if (shouldOptimize) {
      imageView.originX = null;
      imageView.originY = null;
      imageView.translateX = null;
      imageView.translateY = null;
      imageView.rotateZ = null;
      imageView.scaleX = null;
      imageView.scaleY = null;
      return;
    }
    imageView.originX = origin.x;
    imageView.originY = origin.y;
    imageView.translateX = translation.x;
    imageView.translateY = translation.y;
    imageView.rotateZ = rotation;
    imageView.scaleX = scale;
    imageView.scaleY = scale;
  }
});
var createImageView = (_) => _.utils.createView({
  name: "image-preview",
  tag: "div",
  ignoreRect: true,
  mixins: {
    apis: ["image", "crop", "markup", "resize", "dirty", "background"],
    styles: ["translateY", "scaleX", "scaleY", "opacity"],
    animations: {
      scaleX: IMAGE_SCALE_SPRING_PROPS,
      scaleY: IMAGE_SCALE_SPRING_PROPS,
      translateY: IMAGE_SCALE_SPRING_PROPS,
      opacity: { type: "tween", duration: 400 }
    }
  },
  create: ({ root, props }) => {
    root.ref.clip = root.appendChildView(
      root.createChildView(createClipView(_), {
        id: props.id,
        image: props.image,
        crop: props.crop,
        markup: props.markup,
        resize: props.resize,
        dirty: props.dirty,
        background: props.background
      })
    );
  },
  write: ({ root, props, shouldOptimize }) => {
    const { clip } = root.ref;
    const { image, crop, markup, resize, dirty } = props;
    clip.crop = crop;
    clip.markup = markup;
    clip.resize = resize;
    clip.dirty = dirty;
    clip.opacity = shouldOptimize ? 0 : 1;
    if (shouldOptimize || root.rect.element.hidden) return;
    const imageAspectRatio = image.height / image.width;
    let aspectRatio = crop.aspectRatio || imageAspectRatio;
    const containerWidth = root.rect.inner.width;
    const containerHeight = root.rect.inner.height;
    let fixedPreviewHeight = root.query("GET_IMAGE_PREVIEW_HEIGHT");
    const minPreviewHeight = root.query("GET_IMAGE_PREVIEW_MIN_HEIGHT");
    const maxPreviewHeight = root.query("GET_IMAGE_PREVIEW_MAX_HEIGHT");
    const panelAspectRatio = root.query("GET_PANEL_ASPECT_RATIO");
    const allowMultiple = root.query("GET_ALLOW_MULTIPLE");
    if (panelAspectRatio && !allowMultiple) {
      fixedPreviewHeight = containerWidth * panelAspectRatio;
      aspectRatio = panelAspectRatio;
    }
    let clipHeight = fixedPreviewHeight !== null ? fixedPreviewHeight : Math.max(
      minPreviewHeight,
      Math.min(containerWidth * aspectRatio, maxPreviewHeight)
    );
    let clipWidth = clipHeight / aspectRatio;
    if (clipWidth > containerWidth) {
      clipWidth = containerWidth;
      clipHeight = clipWidth * aspectRatio;
    }
    if (clipHeight > containerHeight) {
      clipHeight = containerHeight;
      clipWidth = containerHeight / aspectRatio;
    }
    clip.width = clipWidth;
    clip.height = clipHeight;
  }
});
var SVG_MASK = `<svg width="500" height="200" viewBox="0 0 500 200" preserveAspectRatio="none">
    <defs>
        <radialGradient id="gradient-__UID__" cx=".5" cy="1.25" r="1.15">
            <stop offset='50%' stop-color='#000000'/>
            <stop offset='56%' stop-color='#0a0a0a'/>
            <stop offset='63%' stop-color='#262626'/>
            <stop offset='69%' stop-color='#4f4f4f'/>
            <stop offset='75%' stop-color='#808080'/>
            <stop offset='81%' stop-color='#b1b1b1'/>
            <stop offset='88%' stop-color='#dadada'/>
            <stop offset='94%' stop-color='#f6f6f6'/>
            <stop offset='100%' stop-color='#ffffff'/>
        </radialGradient>
        <mask id="mask-__UID__">
            <rect x="0" y="0" width="500" height="200" fill="url(#gradient-__UID__)"></rect>
        </mask>
    </defs>
    <rect x="0" width="500" height="200" fill="currentColor" mask="url(#mask-__UID__)"></rect>
</svg>`;
var SVGMaskUniqueId = 0;
var createImageOverlayView = (fpAPI) => fpAPI.utils.createView({
  name: "image-preview-overlay",
  tag: "div",
  ignoreRect: true,
  create: ({ root, props }) => {
    let mask = SVG_MASK;
    if (document.querySelector("base")) {
      const url = new URL(
        window.location.href.replace(window.location.hash, "")
      ).href;
      mask = mask.replace(/url\(\#/g, "url(" + url + "#");
    }
    SVGMaskUniqueId++;
    root.element.classList.add(
      `filepond--image-preview-overlay-${props.status}`
    );
    root.element.innerHTML = mask.replace(/__UID__/g, SVGMaskUniqueId);
  },
  mixins: {
    styles: ["opacity"],
    animations: {
      opacity: { type: "spring", mass: 25 }
    }
  }
});
var BitmapWorker = function() {
  self.onmessage = (e) => {
    createImageBitmap(e.data.message.file).then((bitmap) => {
      self.postMessage({ id: e.data.id, message: bitmap }, [bitmap]);
    });
  };
};
var ColorMatrixWorker = function() {
  self.onmessage = (e) => {
    const imageData = e.data.message.imageData;
    const matrix = e.data.message.colorMatrix;
    const data2 = imageData.data;
    const l = data2.length;
    const m11 = matrix[0];
    const m12 = matrix[1];
    const m13 = matrix[2];
    const m14 = matrix[3];
    const m15 = matrix[4];
    const m21 = matrix[5];
    const m22 = matrix[6];
    const m23 = matrix[7];
    const m24 = matrix[8];
    const m25 = matrix[9];
    const m31 = matrix[10];
    const m32 = matrix[11];
    const m33 = matrix[12];
    const m34 = matrix[13];
    const m35 = matrix[14];
    const m41 = matrix[15];
    const m42 = matrix[16];
    const m43 = matrix[17];
    const m44 = matrix[18];
    const m45 = matrix[19];
    let index = 0, r = 0, g = 0, b = 0, a = 0;
    for (; index < l; index += 4) {
      r = data2[index] / 255;
      g = data2[index + 1] / 255;
      b = data2[index + 2] / 255;
      a = data2[index + 3] / 255;
      data2[index] = Math.max(
        0,
        Math.min((r * m11 + g * m12 + b * m13 + a * m14 + m15) * 255, 255)
      );
      data2[index + 1] = Math.max(
        0,
        Math.min((r * m21 + g * m22 + b * m23 + a * m24 + m25) * 255, 255)
      );
      data2[index + 2] = Math.max(
        0,
        Math.min((r * m31 + g * m32 + b * m33 + a * m34 + m35) * 255, 255)
      );
      data2[index + 3] = Math.max(
        0,
        Math.min((r * m41 + g * m42 + b * m43 + a * m44 + m45) * 255, 255)
      );
    }
    self.postMessage({ id: e.data.id, message: imageData }, [
      imageData.data.buffer
    ]);
  };
};
var getImageSize = (url, cb) => {
  let image = new Image();
  image.onload = () => {
    const width = image.naturalWidth;
    const height = image.naturalHeight;
    image = null;
    cb(width, height);
  };
  image.src = url;
};
var transforms = {
  1: () => [1, 0, 0, 1, 0, 0],
  2: (width) => [-1, 0, 0, 1, width, 0],
  3: (width, height) => [-1, 0, 0, -1, width, height],
  4: (width, height) => [1, 0, 0, -1, 0, height],
  5: () => [0, 1, 1, 0, 0, 0],
  6: (width, height) => [0, 1, -1, 0, height, 0],
  7: (width, height) => [0, -1, -1, 0, height, width],
  8: (width) => [0, -1, 1, 0, 0, width]
};
var fixImageOrientation = (ctx, width, height, orientation) => {
  if (orientation === -1) {
    return;
  }
  ctx.transform.apply(ctx, transforms[orientation](width, height));
};
var createPreviewImage = (data2, width, height, orientation) => {
  width = Math.round(width);
  height = Math.round(height);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (orientation >= 5 && orientation <= 8) {
    [width, height] = [height, width];
  }
  fixImageOrientation(ctx, width, height, orientation);
  ctx.drawImage(data2, 0, 0, width, height);
  return canvas;
};
var isBitmap = (file) => /^image/.test(file.type) && !/svg/.test(file.type);
var MAX_WIDTH = 10;
var MAX_HEIGHT = 10;
var calculateAverageColor = (image) => {
  const scalar = Math.min(MAX_WIDTH / image.width, MAX_HEIGHT / image.height);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const width = canvas.width = Math.ceil(image.width * scalar);
  const height = canvas.height = Math.ceil(image.height * scalar);
  ctx.drawImage(image, 0, 0, width, height);
  let data2 = null;
  try {
    data2 = ctx.getImageData(0, 0, width, height).data;
  } catch (e) {
    return null;
  }
  const l = data2.length;
  let r = 0;
  let g = 0;
  let b = 0;
  let i = 0;
  for (; i < l; i += 4) {
    r += data2[i] * data2[i];
    g += data2[i + 1] * data2[i + 1];
    b += data2[i + 2] * data2[i + 2];
  }
  r = averageColor(r, l);
  g = averageColor(g, l);
  b = averageColor(b, l);
  return { r, g, b };
};
var averageColor = (c, l) => Math.floor(Math.sqrt(c / (l / 4)));
var cloneCanvas = (origin, target) => {
  target = target || document.createElement("canvas");
  target.width = origin.width;
  target.height = origin.height;
  const ctx = target.getContext("2d");
  ctx.drawImage(origin, 0, 0);
  return target;
};
var cloneImageData = (imageData) => {
  let id;
  try {
    id = new ImageData(imageData.width, imageData.height);
  } catch (e) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    id = ctx.createImageData(imageData.width, imageData.height);
  }
  id.data.set(new Uint8ClampedArray(imageData.data));
  return id;
};
var loadImage = (url) => new Promise((resolve, reject) => {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = () => {
    resolve(img);
  };
  img.onerror = (e) => {
    reject(e);
  };
  img.src = url;
});
var createImageWrapperView = (_) => {
  const OverlayView = createImageOverlayView(_);
  const ImageView = createImageView(_);
  const { createWorker } = _.utils;
  const applyFilter = (root, filter, target) => new Promise((resolve) => {
    if (!root.ref.imageData) {
      root.ref.imageData = target.getContext("2d").getImageData(0, 0, target.width, target.height);
    }
    const imageData = cloneImageData(root.ref.imageData);
    if (!filter || filter.length !== 20) {
      target.getContext("2d").putImageData(imageData, 0, 0);
      return resolve();
    }
    const worker = createWorker(ColorMatrixWorker);
    worker.post(
      {
        imageData,
        colorMatrix: filter
      },
      (response) => {
        target.getContext("2d").putImageData(response, 0, 0);
        worker.terminate();
        resolve();
      },
      [imageData.data.buffer]
    );
  });
  const removeImageView = (root, imageView) => {
    root.removeChildView(imageView);
    imageView.image.width = 1;
    imageView.image.height = 1;
    imageView._destroy();
  };
  const shiftImage = ({ root }) => {
    const imageView = root.ref.images.shift();
    imageView.opacity = 0;
    imageView.translateY = -15;
    root.ref.imageViewBin.push(imageView);
    return imageView;
  };
  const pushImage = ({ root, props, image }) => {
    const id = props.id;
    const item = root.query("GET_ITEM", { id });
    if (!item) return;
    const crop = item.getMetadata("crop") || {
      center: {
        x: 0.5,
        y: 0.5
      },
      flip: {
        horizontal: false,
        vertical: false
      },
      zoom: 1,
      rotation: 0,
      aspectRatio: null
    };
    const background = root.query(
      "GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR"
    );
    let markup;
    let resize;
    let dirty = false;
    if (root.query("GET_IMAGE_PREVIEW_MARKUP_SHOW")) {
      markup = item.getMetadata("markup") || [];
      resize = item.getMetadata("resize");
      dirty = true;
    }
    const imageView = root.appendChildView(
      root.createChildView(ImageView, {
        id,
        image,
        crop,
        resize,
        markup,
        dirty,
        background,
        opacity: 0,
        scaleX: 1.15,
        scaleY: 1.15,
        translateY: 15
      }),
      root.childViews.length
    );
    root.ref.images.push(imageView);
    imageView.opacity = 1;
    imageView.scaleX = 1;
    imageView.scaleY = 1;
    imageView.translateY = 0;
    setTimeout(() => {
      root.dispatch("DID_IMAGE_PREVIEW_SHOW", { id });
    }, 250);
  };
  const updateImage2 = ({ root, props }) => {
    const item = root.query("GET_ITEM", { id: props.id });
    if (!item) return;
    const imageView = root.ref.images[root.ref.images.length - 1];
    imageView.crop = item.getMetadata("crop");
    imageView.background = root.query(
      "GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR"
    );
    if (root.query("GET_IMAGE_PREVIEW_MARKUP_SHOW")) {
      imageView.dirty = true;
      imageView.resize = item.getMetadata("resize");
      imageView.markup = item.getMetadata("markup");
    }
  };
  const didUpdateItemMetadata = ({ root, props, action }) => {
    if (!/crop|filter|markup|resize/.test(action.change.key)) return;
    if (!root.ref.images.length) return;
    const item = root.query("GET_ITEM", { id: props.id });
    if (!item) return;
    if (/filter/.test(action.change.key)) {
      const imageView = root.ref.images[root.ref.images.length - 1];
      applyFilter(root, action.change.value, imageView.image);
      return;
    }
    if (/crop|markup|resize/.test(action.change.key)) {
      const crop = item.getMetadata("crop");
      const image = root.ref.images[root.ref.images.length - 1];
      if (crop && crop.aspectRatio && image.crop && image.crop.aspectRatio && Math.abs(crop.aspectRatio - image.crop.aspectRatio) > 1e-5) {
        const imageView = shiftImage({ root });
        pushImage({ root, props, image: cloneCanvas(imageView.image) });
      } else {
        updateImage2({ root, props });
      }
    }
  };
  const canCreateImageBitmap = (file) => {
    const userAgent = window.navigator.userAgent;
    const isFirefox = userAgent.match(/Firefox\/([0-9]+)\./);
    const firefoxVersion = isFirefox ? parseInt(isFirefox[1]) : null;
    if (firefoxVersion !== null && firefoxVersion <= 58) return false;
    return "createImageBitmap" in window && isBitmap(file);
  };
  const didCreatePreviewContainer = ({ root, props }) => {
    const { id } = props;
    const item = root.query("GET_ITEM", id);
    if (!item) return;
    const fileURL = URL.createObjectURL(item.file);
    getImageSize(fileURL, (width, height) => {
      root.dispatch("DID_IMAGE_PREVIEW_CALCULATE_SIZE", {
        id,
        width,
        height
      });
    });
  };
  const drawPreview = ({ root, props }) => {
    const { id } = props;
    const item = root.query("GET_ITEM", id);
    if (!item) return;
    const fileURL = URL.createObjectURL(item.file);
    const loadPreviewFallback = () => {
      loadImage(fileURL).then(previewImageLoaded);
    };
    const previewImageLoaded = (imageData) => {
      URL.revokeObjectURL(fileURL);
      const exif = item.getMetadata("exif") || {};
      const orientation = exif.orientation || -1;
      let { width, height } = imageData;
      if (!width || !height) return;
      if (orientation >= 5 && orientation <= 8) {
        [width, height] = [height, width];
      }
      const pixelDensityFactor = Math.max(1, window.devicePixelRatio * 0.75);
      const zoomFactor = root.query("GET_IMAGE_PREVIEW_ZOOM_FACTOR");
      const scaleFactor = zoomFactor * pixelDensityFactor;
      const previewImageRatio = height / width;
      const previewContainerWidth = root.rect.element.width;
      const previewContainerHeight = root.rect.element.height;
      let imageWidth = previewContainerWidth;
      let imageHeight = imageWidth * previewImageRatio;
      if (previewImageRatio > 1) {
        imageWidth = Math.min(width, previewContainerWidth * scaleFactor);
        imageHeight = imageWidth * previewImageRatio;
      } else {
        imageHeight = Math.min(height, previewContainerHeight * scaleFactor);
        imageWidth = imageHeight / previewImageRatio;
      }
      const previewImage = createPreviewImage(
        imageData,
        imageWidth,
        imageHeight,
        orientation
      );
      const done = () => {
        const averageColor2 = root.query(
          "GET_IMAGE_PREVIEW_CALCULATE_AVERAGE_IMAGE_COLOR"
        ) ? calculateAverageColor(data) : null;
        item.setMetadata("color", averageColor2, true);
        if ("close" in imageData) {
          imageData.close();
        }
        root.ref.overlayShadow.opacity = 1;
        pushImage({ root, props, image: previewImage });
      };
      const filter = item.getMetadata("filter");
      if (filter) {
        applyFilter(root, filter, previewImage).then(done);
      } else {
        done();
      }
    };
    if (canCreateImageBitmap(item.file)) {
      const worker = createWorker(BitmapWorker);
      worker.post(
        {
          file: item.file
        },
        (imageBitmap) => {
          worker.terminate();
          if (!imageBitmap) {
            loadPreviewFallback();
            return;
          }
          previewImageLoaded(imageBitmap);
        }
      );
    } else {
      loadPreviewFallback();
    }
  };
  const didDrawPreview = ({ root }) => {
    const image = root.ref.images[root.ref.images.length - 1];
    image.translateY = 0;
    image.scaleX = 1;
    image.scaleY = 1;
    image.opacity = 1;
  };
  const restoreOverlay = ({ root }) => {
    root.ref.overlayShadow.opacity = 1;
    root.ref.overlayError.opacity = 0;
    root.ref.overlaySuccess.opacity = 0;
  };
  const didThrowError = ({ root }) => {
    root.ref.overlayShadow.opacity = 0.25;
    root.ref.overlayError.opacity = 1;
  };
  const didCompleteProcessing = ({ root }) => {
    root.ref.overlayShadow.opacity = 0.25;
    root.ref.overlaySuccess.opacity = 1;
  };
  const create = ({ root }) => {
    root.ref.images = [];
    root.ref.imageData = null;
    root.ref.imageViewBin = [];
    root.ref.overlayShadow = root.appendChildView(
      root.createChildView(OverlayView, {
        opacity: 0,
        status: "idle"
      })
    );
    root.ref.overlaySuccess = root.appendChildView(
      root.createChildView(OverlayView, {
        opacity: 0,
        status: "success"
      })
    );
    root.ref.overlayError = root.appendChildView(
      root.createChildView(OverlayView, {
        opacity: 0,
        status: "failure"
      })
    );
  };
  return _.utils.createView({
    name: "image-preview-wrapper",
    create,
    styles: ["height"],
    apis: ["height"],
    destroy: ({ root }) => {
      root.ref.images.forEach((imageView) => {
        imageView.image.width = 1;
        imageView.image.height = 1;
      });
    },
    didWriteView: ({ root }) => {
      root.ref.images.forEach((imageView) => {
        imageView.dirty = false;
      });
    },
    write: _.utils.createRoute(
      {
        // image preview stated
        DID_IMAGE_PREVIEW_DRAW: didDrawPreview,
        DID_IMAGE_PREVIEW_CONTAINER_CREATE: didCreatePreviewContainer,
        DID_FINISH_CALCULATE_PREVIEWSIZE: drawPreview,
        DID_UPDATE_ITEM_METADATA: didUpdateItemMetadata,
        // file states
        DID_THROW_ITEM_LOAD_ERROR: didThrowError,
        DID_THROW_ITEM_PROCESSING_ERROR: didThrowError,
        DID_THROW_ITEM_INVALID: didThrowError,
        DID_COMPLETE_ITEM_PROCESSING: didCompleteProcessing,
        DID_START_ITEM_PROCESSING: restoreOverlay,
        DID_REVERT_ITEM_PROCESSING: restoreOverlay
      },
      ({ root }) => {
        const viewsToRemove = root.ref.imageViewBin.filter(
          (imageView) => imageView.opacity === 0
        );
        root.ref.imageViewBin = root.ref.imageViewBin.filter(
          (imageView) => imageView.opacity > 0
        );
        viewsToRemove.forEach((imageView) => removeImageView(root, imageView));
        viewsToRemove.length = 0;
      }
    )
  });
};
var plugin = (fpAPI) => {
  const { addFilter, utils } = fpAPI;
  const { Type, createRoute, isFile } = utils;
  const imagePreviewView = createImageWrapperView(fpAPI);
  addFilter("CREATE_VIEW", (viewAPI) => {
    const { is, view, query } = viewAPI;
    if (!is("file") || !query("GET_ALLOW_IMAGE_PREVIEW")) return;
    const didLoadItem = ({ root, props }) => {
      const { id } = props;
      const item = query("GET_ITEM", id);
      if (!item || !isFile(item.file) || item.archived) return;
      const file = item.file;
      if (!isPreviewableImage(file)) return;
      if (!query("GET_IMAGE_PREVIEW_FILTER_ITEM")(item)) return;
      const supportsCreateImageBitmap = "createImageBitmap" in (window || {});
      const maxPreviewFileSize = query("GET_IMAGE_PREVIEW_MAX_FILE_SIZE");
      if (!supportsCreateImageBitmap && (maxPreviewFileSize && file.size > maxPreviewFileSize))
        return;
      root.ref.imagePreview = view.appendChildView(
        view.createChildView(imagePreviewView, { id })
      );
      const fixedPreviewHeight = root.query("GET_IMAGE_PREVIEW_HEIGHT");
      if (fixedPreviewHeight) {
        root.dispatch("DID_UPDATE_PANEL_HEIGHT", {
          id: item.id,
          height: fixedPreviewHeight
        });
      }
      const queue = !supportsCreateImageBitmap && file.size > query("GET_IMAGE_PREVIEW_MAX_INSTANT_PREVIEW_FILE_SIZE");
      root.dispatch("DID_IMAGE_PREVIEW_CONTAINER_CREATE", { id }, queue);
    };
    const rescaleItem = (root, props) => {
      if (!root.ref.imagePreview) return;
      let { id } = props;
      const item = root.query("GET_ITEM", { id });
      if (!item) return;
      const panelAspectRatio = root.query("GET_PANEL_ASPECT_RATIO");
      const itemPanelAspectRatio = root.query("GET_ITEM_PANEL_ASPECT_RATIO");
      const fixedHeight = root.query("GET_IMAGE_PREVIEW_HEIGHT");
      if (panelAspectRatio || itemPanelAspectRatio || fixedHeight) return;
      let { imageWidth, imageHeight } = root.ref;
      if (!imageWidth || !imageHeight) return;
      const minPreviewHeight = root.query("GET_IMAGE_PREVIEW_MIN_HEIGHT");
      const maxPreviewHeight = root.query("GET_IMAGE_PREVIEW_MAX_HEIGHT");
      const exif = item.getMetadata("exif") || {};
      const orientation = exif.orientation || -1;
      if (orientation >= 5 && orientation <= 8)
        [imageWidth, imageHeight] = [imageHeight, imageWidth];
      if (!isBitmap(item.file) || root.query("GET_IMAGE_PREVIEW_UPSCALE")) {
        const scalar = 2048 / imageWidth;
        imageWidth *= scalar;
        imageHeight *= scalar;
      }
      const imageAspectRatio = imageHeight / imageWidth;
      const previewAspectRatio = (item.getMetadata("crop") || {}).aspectRatio || imageAspectRatio;
      let previewHeightMax = Math.max(
        minPreviewHeight,
        Math.min(imageHeight, maxPreviewHeight)
      );
      const itemWidth = root.rect.element.width;
      const previewHeight = Math.min(
        itemWidth * previewAspectRatio,
        previewHeightMax
      );
      root.dispatch("DID_UPDATE_PANEL_HEIGHT", {
        id: item.id,
        height: previewHeight
      });
    };
    const didResizeView = ({ root }) => {
      root.ref.shouldRescale = true;
    };
    const didUpdateItemMetadata = ({ root, action }) => {
      if (action.change.key !== "crop") return;
      root.ref.shouldRescale = true;
    };
    const didCalculatePreviewSize = ({ root, action }) => {
      root.ref.imageWidth = action.width;
      root.ref.imageHeight = action.height;
      root.ref.shouldRescale = true;
      root.ref.shouldDrawPreview = true;
      root.dispatch("KICK");
    };
    view.registerWriter(
      createRoute(
        {
          DID_RESIZE_ROOT: didResizeView,
          DID_STOP_RESIZE: didResizeView,
          DID_LOAD_ITEM: didLoadItem,
          DID_IMAGE_PREVIEW_CALCULATE_SIZE: didCalculatePreviewSize,
          DID_UPDATE_ITEM_METADATA: didUpdateItemMetadata
        },
        ({ root, props }) => {
          if (!root.ref.imagePreview) return;
          if (root.rect.element.hidden) return;
          if (root.ref.shouldRescale) {
            rescaleItem(root, props);
            root.ref.shouldRescale = false;
          }
          if (root.ref.shouldDrawPreview) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                root.dispatch("DID_FINISH_CALCULATE_PREVIEWSIZE", {
                  id: props.id
                });
              });
            });
            root.ref.shouldDrawPreview = false;
          }
        }
      )
    );
  });
  return {
    options: {
      // Enable or disable image preview
      allowImagePreview: [true, Type.BOOLEAN],
      // filters file items to determine which are shown as preview
      imagePreviewFilterItem: [() => true, Type.FUNCTION],
      // Fixed preview height
      imagePreviewHeight: [null, Type.INT],
      // Min image height
      imagePreviewMinHeight: [44, Type.INT],
      // Max image height
      imagePreviewMaxHeight: [256, Type.INT],
      // Max size of preview file for when createImageBitmap is not supported
      imagePreviewMaxFileSize: [null, Type.INT],
      // The amount of extra pixels added to the image preview to allow comfortable zooming
      imagePreviewZoomFactor: [2, Type.INT],
      // Should we upscale small images to fit the max bounding box of the preview area
      imagePreviewUpscale: [false, Type.BOOLEAN],
      // Max size of preview file that we allow to try to instant preview if createImageBitmap is not supported, else image is queued for loading
      imagePreviewMaxInstantPreviewFileSize: [1e6, Type.INT],
      // Style of the transparancy indicator used behind images
      imagePreviewTransparencyIndicator: [null, Type.STRING],
      // Enables or disables reading average image color
      imagePreviewCalculateAverageImageColor: [false, Type.BOOLEAN],
      // Enables or disables the previewing of markup
      imagePreviewMarkupShow: [true, Type.BOOLEAN],
      // Allows filtering of markup to only show certain shapes
      imagePreviewMarkupFilter: [() => true, Type.FUNCTION]
    }
  };
};
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
if (isBrowser) {
  document.dispatchEvent(
    new CustomEvent("FilePond:pluginloaded", { detail: plugin })
  );
}
var filepond_plugin_image_preview_esm_default = plugin;
export {
  filepond_plugin_image_preview_esm_default as default
};
/*! Bundled license information:

filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js:
  (*!
   * FilePondPluginImagePreview 4.6.12
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)
*/
//# sourceMappingURL=filepond-plugin-image-preview.js.map
