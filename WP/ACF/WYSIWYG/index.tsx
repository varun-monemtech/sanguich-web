export default function WPWYSIWYG({ anchor, classes, payload:wysiwyg }: { anchor?: string, classes?: string, payload: any }) {
	
	return (
    <div className={`section ${classes}`}>

      { anchor ?
        <div id={`section-${anchor}`} className="anchor"></div>
      : null }

      { wysiwyg ?
        <div
          dangerouslySetInnerHTML={{ __html: wysiwyg }}
        />
      : null }

    </div>
	)
}