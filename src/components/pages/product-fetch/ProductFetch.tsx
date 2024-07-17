import { Button, Checkbox } from "antd";
import axios from "axios";
import { useState } from "react";

function ProductFetch() {
  const [data, setData] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string>("");

  // 데이터 가져오기
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/zentrade");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      {fileName && <p>Selected file: {fileName}</p>}
      <Checkbox>젠트레이드</Checkbox>
      <Button onClick={fetchData}>가져오기</Button>
    </div>
  );
}

export default ProductFetch;
