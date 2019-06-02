// modules
import * as R from "ramda";
import { isNumber } from "util";

export const getToggledValue = (task, todoId) =>
  R.compose(
    R.prop("completed"),
    R.find(R.propEq("_id", todoId)),
    R.prop("todos")
  )(task);

export const calcNewIndexInDb = (desIndexInDb, desSiblingIndexInDb) => {
  if (
    typeof desIndexInDb === "number" &&
    typeof desSiblingIndexInDb === "number"
  ) {
    return (desIndexInDb + desSiblingIndexInDb) / 2;
  }
};
