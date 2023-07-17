import Image from "next/image";
import HTMLVideo from '../../../components/Video'

export default function WPVideo({ anchor, classes, img, payload: video, wysiwyg }: { anchor?: string, classes?: string, img?: any, payload: any, wysiwyg?: any }, block?: any) {
	
	return (
    <div className={`block-video ${classes}`}>

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

      { video ?
        <HTMLVideo file={video.url} {...block} />
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