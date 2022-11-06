import React, { Fragment, PureComponent, useRef } from "react";
import { VariableSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

const LOADING = 1;
const LOADED = 2;
let itemStatusMap = {};

const getItemSize = (index) => 100;

const isItemLoaded = (index) => !!itemStatusMap[index];
const loadMoreItems = (startIndex, stopIndex) => {
  console.log("loadMoreItems", startIndex, stopIndex);
  for (let index = startIndex; index <= stopIndex; index++) {
    itemStatusMap[index] = LOADING;
  }
  return new Promise((resolve) =>
    setTimeout(() => {
      for (let index = startIndex; index <= stopIndex; index++) {
        itemStatusMap[index] = LOADED;
      }
      resolve();
    }, 1000)
  );
};

class Row extends PureComponent {
  render() {
    const { index, style } = this.props;
    let label;
    if (itemStatusMap[index] === LOADED) {
      label = `Row ${index}`;
    } else {
      label = "Loading...";
    }
    return (
      <div className="ListItem" style={style}>
        {label}
      </div>
    );
  }
}

export default function App() {
  let listRef = useRef(null);

  const scrollToEnd = () => {
    // console.log(listRef.current.ref());
    // const element = document.getElementsByClassName("List");
    // console.log(element);
    // element[0].scroll({ top: 30000 });
  };

  return (
    <Fragment>
      <div onClick={scrollToEnd}>SCROLL END</div>
      <p className="Note">
        This demo app mimics loading remote data with a 2.5s timer. While rows
        are "loading" they will display a "Loading..." label. Once data has been
        "loaded" the row number will be displayed. Start scrolling the list to
        automatically load data.
      </p>
      <InfiniteLoader
        minimumBatchSize={10}
        threshold={2}
        ref={listRef}
        isItemLoaded={isItemLoaded}
        itemCount={1000}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => {
          return (
            <List
              className="List"
              height={300}
              itemCount={1000}
              onItemsRendered={onItemsRendered}
              // ref={listRef}
              itemSize={getItemSize}
              ref={ref}
              width={400}
            >
              {Row}
            </List>
          );
        }}
      </InfiniteLoader>
      <p className="Note">
        Check out the documentation to learn more:
        <br />
        <a href="https://github.com/bvaughn/react-window-infinite-loader#documentation">
          github.com/bvaughn/react-window-infinite-loader
        </a>
      </p>
    </Fragment>
  );
}
