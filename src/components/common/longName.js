import { Fragment, useState } from "react";
import { size } from "lodash";
import { Tooltip } from "reactstrap";
const LongNameFormatter = ({ content, id, max, className, tag }) => {
  const Tag = tag || "div";
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <Fragment>
      {content ? (
        size(content) >= max ? (
          <>
            <>
              <Tag className={className} id={`Id-${id}`}>{`${content.slice(
                0,
                max - 1
              )}...`}</Tag>
              <Tooltip
                isOpen={tooltipOpen}
                toggle={() => setTooltipOpen(!tooltipOpen)}
                target={`Id-${id}`}
              >
                {content}
              </Tooltip>
            </>
          </>
        ) : (
          <>
            {" "}
            <Tag className={className}>{content}</Tag>
          </>
        )
      ) : (
        "-"
      )}
    </Fragment>
  );
};
export default LongNameFormatter;
