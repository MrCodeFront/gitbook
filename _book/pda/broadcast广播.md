## broadcast 广播

##### 新pda

```java
//刷卡
//注册广播
IntentFilter LfDataIntentFilter = new IntentFilter();
LfDataIntentFilter.addAction("ACTION_BAR_LF");
registerReceiver(mLfDataReceiver, LfDataIntentFilter);

//注销广播
unregisterReceiver(mLfDataReceiver);

//数据接收
private BroadcastReceiver mScanDataReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
        // TODO Auto-generated method stub
        String action = intent.getAction();
        if (action.equals("ACTION_BAR_SCAN")) {
          String str = intent.getStringExtra("EXTRA_SCAN_DATA"); // str : barcode
          appView.loadUrl("javascript:Scan.ScanBar('"+str+"',1)");
        }
    }
};

//扫描
//注册广播
IntentFilter scanDataIntentFilter = new IntentFilter();
scanDataIntentFilter.addAction("ACTION_BAR_SCAN");
registerReceiver(mScanDataReceiver, scanDataIntentFilter);

//注销广播
unregisterReceiver(mScanDataReceiver);

 //数据接收
 private BroadcastReceiver mScanDataReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
        // TODO Auto-generated method stub
        String action = intent.getAction();
        if (action.equals("ACTION_BAR_SCAN")) {
            String str = intent.getStringExtra("EXTRA_SCAN_DATA"); // str : barcode
			appView.loadUrl("javascript:Scan.ScanBar('"+str+"',0)");
        }
    }
};
```

##### 高频pda

```java
//刷卡
//注册广播
IntentFilter LfDataIntentFilter = new IntentFilter();
LfDataIntentFilter.addAction("ACTION_BAR_LF");
registerReceiver(mLfDataReceiver, LfDataIntentFilter);

//注销广播
unregisterReceiver(mLfDataReceiver);

//数据接收
private BroadcastReceiver mScanDataReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
        // TODO Auto-generated method stub
        String action = intent.getAction();
        if (action.equals("ACTION_BAR_SCAN")) {
          String str = intent.getStringExtra("EXTRA_SCAN_DATA"); // str : barcode
          appView.loadUrl("javascript:Scan.ScanBar('"+str+"',1)");
        }
    }
};

//扫描
//注册广播
IntentFilter scanDataIntentFilter = new IntentFilter();
scanDataIntentFilter.addAction("ACTION_BAR_SCAN");
registerReceiver(mScanDataReceiver, scanDataIntentFilter);

//注销广播
unregisterReceiver(mScanDataReceiver);

 //数据接收
 private BroadcastReceiver mScanDataReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
        // TODO Auto-generated method stub
        String action = intent.getAction();
        if (action.equals("ACTION_BAR_SCAN")) {
            String str = intent.getStringExtra("EXTRA_SCAN_DATA"); // str : barcode
			appView.loadUrl("javascript:Scan.ScanBar('"+str+"',0)");
        }
    }
};
```

##### yfd

```java
//扫描
//注册广播
IntentFilter yfdScanDataIntentFilter = new IntentFilter();
yfdScanDataIntentFilter.addAction("android.intent.ACTION_DECODE_DATA");
registerReceiver(yfdScanDataReceiver, yfdScanDataIntentFilter);

//注销广播
unregisterReceiver(yfdScanDataIntentFilter);

 //数据接收
 private BroadcastReceiver yfdScanDataReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
        // TODO Auto-generated method stub
        String action = intent.getAction();
        if (action.equals("ACTION_BAR_SCAN")) {
            String str = intent.getStringExtra("barcode_string"); // str : barcode
			appView.loadUrl("javascript:Scan.ScanBar('"+str+"',0)");
        }
    }
};
```



mianActivity中添加

```java
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import org.apache.cordova.*;

@Override
public void onCreate(Bundle savedInstanceState)
{
    super.onCreate(savedInstanceState);

    // enable Cordova apps to be started in the background
    Bundle extras = getIntent().getExtras();
    if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
        moveTaskToBack(true);
    }

    //注册按键广播接收者
    IntentFilter scanDataIntentFilter = new IntentFilter();
    scanDataIntentFilter.addAction("ACTION_BAR_SCAN");
    registerReceiver(mScanDataReceiver, scanDataIntentFilter);
    IntentFilter LfDataIntentFilter = new IntentFilter();
    LfDataIntentFilter.addAction("ACTION_BAR_LF");
    registerReceiver(mLfDataReceiver, LfDataIntentFilter);

    IntentFilter topScanIntentFilter = new IntentFilter();
    topScanIntentFilter.addAction("com.android.server.scannerservice.broadcast1");
    registerReceiver(topScanDataReceiver, topScanIntentFilter);
    IntentFilter topLfIntentFilter = new IntentFilter();
    topLfIntentFilter.addAction("com.android.server.scannerservice.broadcast2");
    registerReceiver(topLfDataReceiver, topLfIntentFilter);
  
  	IntentFilter iDataScanIntentFilter = new IntentFilter();
    iDataScanIntentFilter.addAction("android.intent.action.SCANRESULT");
    registerReceiver(iDataScanDataReceiver, iDataScanIntentFilter);
    IntentFilter iDataLfIntentFilter = new IntentFilter();
    iDataLfIntentFilter.addAction("com.idata.uhfdata");
    registerReceiver(iDataLfDataReceiver, iDataLfIntentFilter);

    // Set by <content src="index.html" /> in config.xml
    loadUrl(launchUrl);
}
/**
 * 广播接收器
 */
private BroadcastReceiver mScanDataReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
        // TODO Auto-generated method stub
        String action = intent.getAction();
        if (action.equals("ACTION_BAR_SCAN")) {
          String str = intent.getStringExtra("EXTRA_SCAN_DATA"); // str : barcode
          appView.loadUrl("javascript:Scan.ScanBar('"+str+"',0)");
        }
    }
};
private BroadcastReceiver mLfDataReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
      // TODO Auto-generated method stub
      String action = intent.getAction();
      if (action.equals("ACTION_BAR_LF")) {
        String str = intent.getStringExtra("EXTRA_LF_DATA"); // str : ID
        appView.loadUrl("javascript:Scan.ScanBar('"+str+"',1)");
      }
    }
};

// 高频枪
private BroadcastReceiver topScanDataReceiver = new BroadcastReceiver() {
  @Override
  public void onReceive(Context context, Intent intent) {
    // TODO Auto-generated method stub
    String action = intent.getAction();
    if (action.equals("com.android.server.scannerservice.broadcast1")) {
      String str = intent.getStringExtra("scannerdata"); // str : ID
      appView.loadUrl("javascript:Scan.ScanBar('"+str+"',0)");
    }
  }
};
private BroadcastReceiver topLfDataReceiver = new BroadcastReceiver() {
  @Override
  public void onReceive(Context context, Intent intent) {
    // TODO Auto-generated method stub
    String action = intent.getAction();
    if (action.equals("com.android.server.scannerservice.broadcast2")) {
      String str = intent.getStringExtra("scannerdata"); // str : ID
      appView.loadUrl("javascript:Scan.ScanBar('"+str+"',1)");
    }
  }
};

// iData
private BroadcastReceiver iDataScanDataReceiver = new BroadcastReceiver() {
  @Override
  public void onReceive(Context context, Intent intent) {
    // TODO Auto-generated method stub
    String action = intent.getAction();
    if (action.equals("android.intent.action.SCANRESULT")) {
      String str = intent.getStringExtra("value");
      appView.loadUrl("javascript:Scan.ScanBar('"+str+"',0)");
    }
  }
};
private BroadcastReceiver iDataLfDataReceiver = new BroadcastReceiver() {
  @Override
  public void onReceive(Context context, Intent intent) {
    // TODO Auto-generated method stub
    String action = intent.getAction();
    if (action.equals("com.idata.uhfdata")) {
      String str = intent.getStringExtra("value");
      appView.loadUrl("javascript:Scan.ScanBar('"+str+"',1)");
    }
  }
};

@Override
public void onDestroy() {
    //注销广播
    unregisterReceiver(mScanDataReceiver);
    unregisterReceiver(mLfDataReceiver);
    unregisterReceiver(topScanDataReceiver);
    unregisterReceiver(topLfDataReceiver);
    unregisterReceiver(iDataScanDataReceiver);
    unregisterReceiver(iDataLfDataReceiver);
}
```

 

旧的广播事件及获取键：

扫码action：android.scanservice.action.UPLOAD_BARCODE_DATA

接收键名：barcode

刷卡action：android.rfid.FUN_KEY

接收键名：data