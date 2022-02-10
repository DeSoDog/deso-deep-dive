export interface ChapterApiTemplateProps {
  request: any;
  response: any;
  endpoint: string | null;
  onClick: () => void;
  title: string;
}
export const ChapterReadTemplate = ({
  request,
  response,
  endpoint,
  title,
  onClick,
}: ChapterApiTemplateProps) => {
  return (
    <div>
      <div className=" rounded-lg min-h-[300px] p-2">
        <div className="font-semibold text-lg">
          Click{" "}
          <span
            onClick={onClick}
            className="cursor-pointer text-[#1776cf] hover:text-[#fff]"
          >
            here
          </span>{" "}
          to call {title}
        </div>
        <div>EndPoint:</div>
        <div className="overflow-auto min-h-[50px] max-h-[100px] bg-[#dadada] p-2">
          {endpoint && JSON.stringify(endpoint, null, 2)}
        </div>
        <div>Request:</div>
        <div className="overflow-auto min-h-[150px] max-h-[100px] bg-[#dadada] p-2">
          {request && JSON.stringify(request, null, 2)}
        </div>
        <div className="mt-2">Response:</div>
        <div className="overflow-auto min-h-[300px] max-h-[300px] bg-[#dadada] p-2">
          <p className=" whitespace-pre-wrap ">
            {response && JSON.stringify(response, null, 2)}
          </p>
        </div>{" "}
      </div>
    </div>
  );
};
