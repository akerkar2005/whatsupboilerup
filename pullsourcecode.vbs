Function GetSourceCode(url)
     Set objHttp = CreateObject("Msxml2.ServerXMLHTTP")
     bGetAsAsync = False

     objHttp.open "GET", url, bGetAsAsync
     objHttp.send

     If objHttp.status <> 200 Then
         wscript.Echo "unexpected status = " & objHttp.status & vbCrLf & objHttp.statusText
         wscript.Quit
     End If

     'MsgBox objHttp.responseText

     GetSourceCode = objHttp.responseText
End Function

Dim rss_source  
rss_source =  GetSourceCode("https://boilerlink.purdue.edu/events.rss")
Dim fso, ResultFile, scriptdir
   Set fso = CreateObject("Scripting.FileSystemObject")
   
   scriptdir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)

    Wscript.Echo scriptdir

   Set ResultFile = fso.CreateTextFile (scriptdir + "\results.txt", True)
   ResultFile.WriteLine(rss_source)
   ResultFile.Close