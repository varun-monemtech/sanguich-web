import Image from "next/image";

export default function WPImage({ anchor, classes, payload:img, wysiwyg }: { anchor?: string, classes?: string, payload: any, wysiwyg?: any }) {
	
	return (
    <div className={`block-image ${classes}`}>

      { anchor ?
        <div id={`section-${anchor}`} className="anchor"></div>
      : null }

      { img ?
        <Image
          width={img.width}
          height={img.height}
          src={img.url}
          alt={img.alt}
        />
      : null }

      { wysiwyg ?
        <div
          className="img-caption"
          dangerouslySetInnerHTML={{ __html: wysiwyg }}
        />
      : null }

    </div>
	)
}