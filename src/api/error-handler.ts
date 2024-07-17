import { message } from "antd";
import type { AxiosError } from "axios";
import { ERROR_MESSAGE } from "src/const/error-message";

type ValidateError = {
    id: string;
    message: string;
    error?: string;
    statusCode?: number;
};

const errorHandler = async (
    err: AxiosError<ValidateError, Record<string, unknown>>
) => {
    /*
  
  에러 관련된 예외 처리는 아래 switch 문을 통해서 하면 됩니다.
  
  1. 서버 응답 코드에 따른 클라이언트단에서 에러 메세지 처리
  2. 서버에서 예외 메세지를 같이 전달하여, 클라이언트에서는 메세지만 불러주는 형태로 처리
  switch(err.response?.status) {
    case 401:
      message.error(err.response.data.message)
  }
  */
    switch (err?.response?.data?.message) {
        case "INVALID_PASSWORD":
            message.error({
                content: ERROR_MESSAGE.notFound.password,
                key: "login/password",
            });
            break;
        case "NOT_FOUND_USER":
            message.error({
                content: ERROR_MESSAGE.notFound.userId,
                key: "login/userId",
            });
            break;
        case "ONLY_FOR_ADMIN":
            message.error({
                content: ERROR_MESSAGE.notFound.isAdmin,
                key: "login/isAdmin",
            });
            break;
        case "STATUS_IS_NOT_ENABLED":
            message.error({
                content: ERROR_MESSAGE.notAccess.userId,
                key: "login/status",
            });
            break;
        default:
            break;
    }
};

export default errorHandler;
