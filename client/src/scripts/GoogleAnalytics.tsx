import Script from "next/script";

export default function GoogleAnalyticsScript() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-KRBZ3C9RZ3"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KRBZ3C9RZ3');
            gtag('config', 'AW-957087687');

            // Fire the conversion event for web traffic
            gtag('event', 'conversion', {'send_to': 'AW-957087687/YDMlCJXsifoYEMf_r8gD'});
            `}
      </Script>
      <Script id="gtag-conversion" strategy="afterInteractive">
        {`
            function gtagReportConversion(url) {
              gtag('event', 'conversion', {
                'send_to': 'AW-957087687/YDMlCJXsifoYEMf_r8gD',
                'event_callback': function() {
                  if (typeof(url) !== 'undefined') {
                    window.location = url;
                  }
                }
              });
              return false;
            }
            `}
      </Script>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-957087687"
        strategy="afterInteractive"
      />
      <Script id="google-analytics-aw" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-957087687');
          `}
      </Script>
    </>
  );
}
