/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CreateSliceOptions } from "@reduxjs/toolkit";

import { mergeObjects } from "@/utils/helpers";

function rootReducerData(options?: any) {
  let _rootReducerData: CreateSliceOptions = {
    name: "root",
    initialState: { projectName: "" },
    reducers: {
      setProjectName: (state, payload) => {
        state.projectName = payload.payload;
      },
    },
  };
  if (options?.root)
    _rootReducerData = mergeObjects<CreateSliceOptions>(_rootReducerData, options.root);

  return _rootReducerData;
}

function enableDevTools() {
  const win: any = global.window;
  return (
    win?.__REDUX_DEVTOOLS_EXTENSION__ &&
    win.__REDUX_DEVTOOLS_EXTENSION__({
      serialize: {
        options: {
          undefined: true,
          function(fn: any) {
            return fn.toString();
          },
        },
      },
    })
  );
}

export { enableDevTools, rootReducerData };
