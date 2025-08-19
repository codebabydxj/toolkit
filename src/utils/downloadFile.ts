import { dayjs } from "element-plus";
import { apiConfig } from "../api/apiConfig";

/**
 * @description:
 * @param {Blob} data
 * @param {string} type
 * @param {any} headers
 * @return {*}
 */
export const downloadFile = (
  data: Blob,
  type: string = "application/vnd.ms-excel",
  headers: any,
  open: boolean = false
): void => {
  const fileName = headers.split("=").pop();
  const name = fileName.split(".");
  const blob = new Blob([data], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  const time = dayjs().format("YYYYMMDDhhmmss");
  link.href = url;
  if (open) {
    link.target = "_blank";
  } else {
    link.download = decodeURIComponent(name[0]) + "-" + time + "." + name[1];
  }
  link.click();
  window.URL.revokeObjectURL(url);
};

export const downloadZip = (
  data: Blob,
  headers: any,
): void => {
  const aLink = document.createElement('a')
  let blob = new Blob([data], { type: 'application/zip' })
  const fileName = decodeURI(headers.split("=").pop());
  aLink.href = window.URL.createObjectURL(blob)
  aLink.setAttribute('download', fileName)
  document.body.appendChild(aLink)
  aLink.click()
  document.body.removeChild(aLink);
};

export const viewPdf = (data: Blob, fileType: string = "pdf"): string => {
  const blob = new Blob([data], { type: apiConfig.fileTypes[fileType] });
  return window.URL.createObjectURL(blob);
};
