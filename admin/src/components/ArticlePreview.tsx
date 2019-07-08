import React from "react";
import { Modal } from "antd";
import { IArticle } from "../store/modules/article/article.interface";
import { useTranslation } from "react-i18next";

type Props = {
  visible?: boolean;
  article: IArticle;
  onClose: any;
};

export const ArticlePreview: React.FC<Props> = (props: Props) => {
  const { visible, article, onClose } = props;
  const { t } = useTranslation();

  return (
    <Modal
      title={t("articlePreview")}
      style={{ maxWidth: "96%" }}
      visible={visible}
      footer={null}
      onCancel={onClose}
    >
      {article.html ? (
        <div
          style={{ maxHeight: 500, overflow: "auto" }}
          dangerouslySetInnerHTML={{ __html: article.html }}
        />
      ) : null}
    </Modal>
  );
};
