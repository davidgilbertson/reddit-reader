package com.redditreader.hyperlinkandroid;

import android.content.Intent;
import android.net.Uri;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.common.MapBuilder;

/**
 * {@link NativeModule} that allows JS to open the default browser
    for an url.
 */
public class RNHyperlinkAndroidModule extends ReactContextBaseJavaModule {

  ReactApplicationContext reactContext;

  public RNHyperlinkAndroidModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "HyperlinkAndroid";
  }

  @ReactMethod
  public void open(String url) {
    if (!url.startsWith("https://") && !url.startsWith("http://")) {
      url = "http://" + url;
    }
    Intent intent = new Intent(Intent.ACTION_VIEW);
    intent.setData(Uri.parse(url));
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    this.reactContext.startActivity(intent);
  }
}
