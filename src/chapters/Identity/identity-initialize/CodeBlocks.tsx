import axios from "axios";
import { CopyBlock, nord } from "react-code-blocks";
export const IdentityInitializeCodeBlocks = {
  section1: (
    <CopyBlock
      codeBlock
      text={""}
      language="jsx"
      wrapLines={true}
      theme={nord}
    />
  ),

  section2: (
    <CopyBlock
      codeBlock
      text={""}
      language="jsx"
      wrapLines={true}
      theme={nord}
    />
  ),
  sectionRuntime: (json: any) => {
    return (
      <CopyBlock
        codeBlock
        text={JSON.stringify(json, null, 2)}
        language="json"
        wrapLines={true}
        theme={nord}
      />
    );
  },
  getSourceFromGithub: async () => {
    const response = await axios.get(
      "https://github.com/DeSoDog/deso-deep-dive/blob/master/src/chapters/Identity/identity-initialize/IdentityInitialize.tsx"
    );
    return (
      <CopyBlock
        codeBlock
        text={response.data}
        language="tsx"
        wrapLines={true}
        theme={nord}
      />
    );
  },
};
