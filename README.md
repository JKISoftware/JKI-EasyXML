# JKI-EasyXML

## JKI EasyXML Functions
-----------------------

![JKI EasyXML Palette](https://github.com/JKISoftware/JKI-EasyXML/raw/master/images/JKI_EasyXML_Palette.png)

The JKI EasyXML functions allow you to easily create and parse XML data and files. The main advantage is that EasyXML does not use the LabVIEW data schema defined by NI (&lt;LabVIEW&gt;\\vi.lib\\Utility\\LVXMLSchema.xsd). Instead, it uses the data names as the XML entity names, allowing users to quickly and easily write and read arbitrary XML data. Additionally, EasyXML supports XML entity attributes.

### Easy Generate XML

Converts **LabVIEW Data** to an XML string with the LabVIEW data names (labels) converted to XML item names and the LabVIEW data values converted to XML item values.

![Easy Generate XML](https://github.com/JKISoftware/JKI-EasyXML/raw/master/images/Easy_Generate_XML.png)

### Easy Parse XML

Converts an **XML String** to **LabVIEW Data**, based on the **LabVIEW Data (Type)** argument. Use the **Variant to Data** function to convert the output variant **LabVIEW Data** to the desired data type.

![Easy Parse XML](https://github.com/JKISoftware/JKI-EasyXML/raw/master/images/Easy_Parse_XML.png)

### Easy Write XML File
Converts **LabVIEW Data** to an XML string and writes it to an XML file with the LabVIEW data names (labels) converted to XML item names and the LabVIEW data values converted to XML item values.

![Easy Write XML File](https://github.com/JKISoftware/JKI-EasyXML/raw/master/images/Easy_Write_XML_File.png)

### Easy Read XML File
Reads and parses data from an XML file (specified by the **XML File Path** input), converting it into **LabVIEW Data**, based on the **LabVIEW Data (Type)** argument. Use the **Variant to Data** function to convert the output variant **LabVIEW Data** to the desired data type.

![Easy Read XML File](https://github.com/JKISoftware/JKI-EasyXML/raw/master/images/Easy_Read_XML_File.png)

## Examples
Refer to the &lt;LabVIEW&gt;\\examples\\JKI\\EasyXML folder for examples of using the JKI EasyXML Functions.

You can also find the examples using the NI Example Finder, under the JKI\\EasyXML folder:

![NI Example Finder](https://github.com/JKISoftware/JKI-EasyXML/raw/master/images/NI_Example_Finder.png)

## Detailed Documentation

### EasyXML vs. LabVIEW's built-in XML
The LabVIEW Flatten to XML output, shown below, is focus on LabVIEW data type, whereas the EasyXML output is more focused on the data names and structure, mapping the data names to entity names and data values to entity text (#TEXT):

LabVIEW's built-in XML output:

```xml
<Cluster>
  <Name>My XML Data</Name>
  <NumElts>2</NumElts>
  <DBL>
    <Name>My Number</Name>
    <Val>1.23000</Val>
  </DBL>
  <Boolean>
    <Name>My Boolean</Name>
    <Val>1</Val>
  </Boolean>
</Cluster>
```

EasyXML output:

```xml
<My_XML_Data>
  <My_Number>1.23</My_Number>
  <My_Boolean>TRUE</My_Boolean>
</My_XML_Data>
```

Additionally, the EasyXML library also supports attributes, as shown by the *version* and *author* attributes of the My_XML_Data entity below:

```xml
<My_XML_Data version="2.1" author="Jane Doe">
  <My_Number>1.23</My_Number>
  <My_Boolean>TRUE</My_Boolean>
</My_XML_Data>
```

### Element and Attribute Names
LabVIEW data names map to element and attribute names.  The LabVIEW data names will be converted to legal XML entity names if they contain any illegal entity name characters. Leading and trailing whitespace will be removed (trimmed). Whitespace characters within the data name will be converted to underscores.  Other illegal characters will simply be removed.

### Compound Elements (Clusters)
LabVIEW clusters are used for compound XML elements (elements with child elements).  For example, here is some XML with compound elements:

```xml
<Company>
  <Name>JKI</Name>
  <Location>
    <City>San Francisco</City>
    <Country>USA</Country>
  </Location>
</Company>
```

### Multiple Elements of the Same Name (Arrays)
Arrays can be used to handle multiple XML elements of the same name.  When using LabVIEW arrays, the array name, not the array element name, is used as the xml element name.  For example, if we have a cluster named "employees" that contains an array (of strings) named "person", we might get something like the following:

```xml
<employees>
  <person>Jack</person>
  <person>Jill</person>
  <person>Bob</person>
</employees>
```

### Empty Element Tags
LabVIEW data with a null value will generate an empty element.  For example:

```xml
<empty_element/> instead of <empty_element></empty_element>
```

Note: One exception to this rule is an empty array.  Since an array represents an ordered set of elements, an empty array represents no elements.

### Scalar Elements
Scalar XML elements have no child elements. They consist of string data.  For example, below is a scalar element named "State" with a value of "California":

```xml
<State>California</State>
```

Scalar elements are created from any supported LabVIEW data type, other than clusters (which are used for compound/nested elements).

### Formatting of LabVIEW Data
Below is a table showing the default formatting of LabVIEW data types:
```
string: %s
path: %s
integer: %d
floating point: %#g (automatic)
Boolean: %s (TRUE or FALSE)
```

### Escaping and Unescaping XML in Element and Attribute Values
All data will be escaped in the XML values, such that it does not include any special XML characters (see Table below).  This means that instances of these characters must be converted to escape code.

```
Element or Attribute    Special Character    Escape Code
Both                    &                     &amp;
Both                    >                     &gt;
Both                    <                     &lt;
Attribute Only          '                     &apos;
Attribute Only          "                     &quot;
```

### Adding XML Attributes using an "#attributes" Cluster
XML elements can have attributes.  For example, below is an xml element having two attributes:

```xml
<my_element attribute_1="value 1" attribute_1="value 2" />
```

Attributes are achieved by placing a cluster named "#attributes" as the first cluster element of the xml element cluster.

### Scalar Elements with Attributes
If an xml element (having attributes) is a scalar (no child elements), then the second cluster element must be a LabVIEW scalar with the same name as the element cluster.

### Compound Elements with Attributes
If an element with attributes has more than one (non-attribute) child element, then every cluster element shall be interpreted as a child element (rather than scalar data), even if a child element has the same name as the parent element (cluster).

### Best Attempt Parsing (Extra and Missing XML)
One of the features that makes EasyXML so great is that it can gracefully handle extra and missing data elements in the XML data - it will do it's "best attempt" to parse the XML data.

In the case where there are extra XML elements or attributes that are not present in the LabVIEW data, then they will simply be ignored - this is a "best attempt".

In the case where there are elements or attributes present in the LabVIEW that are not present in the XML data, then the output LabVIEW data will contain the same values passed into the Data Type and Default Value (variant) input - this is a "best attempt".

### Pretty-Print (Block Indentation)
When generating xml data, 2 spaces are used for block indentation of XML entities.  For example:

```xml
<Company>
  <Name>JKI</Name>
  <Location>
    <City>San Francisco</City>
    <Country>USA</Country>
  </Location>
</Company>
```

instead of:

```xml
<Company>
<Name>JKI</Name>
<Location>
<City>San Francisco</City>
<Country>USA</Country>
</Location>
</Company>
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

To contribute to EasyXML, you will need 32-bit LabVIEW 2011 professional development environment.

## Credits

EasyXML is an open source project maintained by [JKI](http://jki.net).

## License

EasyXML is distributed under the open source three clause BSD license providing everyone right to use and distribute both source code
and compiled versions of EasyXML. See LICENSE file for details.
