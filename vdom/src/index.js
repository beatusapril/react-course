/** @jsx h */

function h(type, props, ...children) {
  return { type, props, children };
}

function createElement(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);
  node.children.map(createElement).forEach($el.appendChild.bind($el));
  return $el;
}

function isChanged(node1, node2) {
  return typeof node1 !== typeof node2 ||
    (typeof node1 === 'string' && node1 !== node2) ||
    node1.type !== node2.type
}

function updateElement(root, newNode, oldNode, index = 0) {
  if (oldNode === undefined) {
    root.appendChild(createElement(newNode))
    return;
  } 
  if (newNode === undefined) {
    root.removeChild(root.childNodes[index]);
    return;
  } 
  if (isChanged(newNode, oldNode)) {
    root.replaceChild(createElement(newNode),
      root.childNodes[index]);
      return;
  } 
  
  if (newNode.type) {
    let newLength = newNode.children.length;
    let oldLength = oldNode.children.length;
    let parent = root.childNodes[index];
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(parent, newNode.children[i], oldNode.children[i], i);
    }
  }
}

const initDOM = (
  <div>
    <p>Hello!</p>
    <ul>
      <li>How is it going?</li>
    </ul>
  </div>
);

const addNode = (
  <div>
    <p>Hello!</p>
    <ul>
      <li>How is it going?</li>
    </ul>
    <p>Good</p>
  </div>
);

const removeNode = (
  <div>
    <p>Hello!</p>
    <ul>
      <li>How is it going?</li>
    </ul>
  </div>
);

const changeNode = (
  <div>
    <p>Hi!</p>
    <ul>
      <li>How is it going?</li>
    </ul>
  </div>
);

const rootElement = document.getElementById("root");
rootElement.appendChild(createElement(initDOM));

const initNodeButton = document.createElement("button");
initNodeButton.innerText = "Init";
rootElement.appendChild(initNodeButton);
initNodeButton.addEventListener("click", () => {
  updateElement(rootElement, initDOM, initDOM);
});

const addNodeButton = document.createElement("button");
addNodeButton.innerText = "Add";
rootElement.appendChild(addNodeButton);
addNodeButton.addEventListener("click", () => {
  updateElement(rootElement, addNode, initDOM);
});

const removeNodeButton = document.createElement("button");
removeNodeButton.innerText = "Remove";
rootElement.appendChild(removeNodeButton);

removeNodeButton.addEventListener("click", () => {
  updateElement(rootElement, removeNode, addNode);
});

const changeNodeButton = document.createElement("button");
changeNodeButton.innerText = "Change";
rootElement.appendChild(changeNodeButton);

changeNodeButton.addEventListener("click", () => {
  updateElement(rootElement, changeNode, removeNode);
});
