import React from "react";

export default function ListOfError(props: {
  list: { name: string; msg: string }[];
}) {
  const { list } = props;
  return (
    <ul className="text-left list-disc list-inside">
      {list.map((e) => {
        return (
          <li className="text-[.8rem] font-rethink text-red-500" key={e.name}>
            {e.msg}
          </li>
        );
      })}
    </ul>
  );
}
